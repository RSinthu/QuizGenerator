from fastapi import HTTPException
from langchain.schema import Document
from langchain_community.document_loaders import YoutubeLoader
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
import yt_dlp

api = YouTubeTranscriptApi()


def extract_video_id(url):
    """Extracts the YouTube video ID from a given URL"""
    from urllib.parse import urlparse, parse_qs

    parsed_url = urlparse(url)
    if parsed_url.netloc in ["www.youtube.com", "youtube.com"]:
        return parse_qs(parsed_url.query).get("v", [None])[0]
    elif parsed_url.netloc in ["youtu.be"]:
        return parsed_url.path.lstrip("/")
    return None


def get_youtube_content(url: str):
    video_id = extract_video_id(url)

    try:
        loader = YoutubeLoader.from_youtube_url(url, add_video_info=True)
        return loader.load()
    except Exception:
        try:
            transcript_list = api.list(video_id)
            transcript = transcript_list.find_transcript(['en'])
            data = transcript.fetch()
            text = " ".join([entry.text for entry in data]) 
            return [Document(page_content=text)]
        except TranscriptsDisabled:
            try:
                ydl_opts = {'quiet': True, 'noplaylist': True, 'skip_download': True}
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=False)
                    description = info.get("description", "No description available.")
                    return [Document(page_content=description)]
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"yt-dlp failed: {str(e)}")