// WebRTC configuration with STUN servers for NAT traversal
export const rtcConfig: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
};

/**
 * Create a new RTCPeerConnection with default configuration
 */
export function createPeerConnection(): RTCPeerConnection {
  return new RTCPeerConnection(rtcConfig);
}

/**
 * Get user media (camera + microphone)
 */
export async function getUserMedia(
  video: boolean = true,
  audio: boolean = true
): Promise<MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: video ? { facingMode: "user", width: 1280, height: 720 } : false,
      audio: audio ? { echoCancellation: true, noiseSuppression: true } : false,
    });
    return stream;
  } catch (error) {
    console.error("Error accessing media devices:", error);
    throw error;
  }
}

/**
 * Create an SDP offer (caller)
 */
export async function createOffer(
  peerConnection: RTCPeerConnection
): Promise<RTCSessionDescriptionInit> {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  return offer;
}

/**
 * Create an SDP answer (receiver)
 */
export async function createAnswer(
  peerConnection: RTCPeerConnection,
  offer: RTCSessionDescriptionInit
): Promise<RTCSessionDescriptionInit> {
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  return answer;
}

/**
 * Set remote description (answer)
 */
export async function setRemoteAnswer(
  peerConnection: RTCPeerConnection,
  answer: RTCSessionDescriptionInit
): Promise<void> {
  await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

/**
 * Add ICE candidate
 */
export async function addIceCandidate(
  peerConnection: RTCPeerConnection,
  candidate: RTCIceCandidateInit
): Promise<void> {
  await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
}

/**
 * Stop all tracks in a media stream
 */
export function stopMediaStream(stream: MediaStream | null): void {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
}

/**
 * Add local stream tracks to peer connection
 */
export function addStreamToPeerConnection(
  peerConnection: RTCPeerConnection,
  stream: MediaStream
): void {
  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });
}

/**
 * Toggle a specific track type (audio or video)
 */
export function toggleTrack(
  stream: MediaStream | null,
  kind: "audio" | "video",
  enabled: boolean
): void {
  if (!stream) return;

  stream.getTracks().forEach((track) => {
    if (track.kind === kind) {
      track.enabled = enabled;
    }
  });
}

/**
 * Get screen share stream
 */

export async function getScreenShare(): Promise<MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    return stream;
  } catch (error) {
    console.error("Error accessing screen share:", error);
    throw error;
  }
}

/**
 * Replace video track (for screen sharing)
 */
export async function replaceVideoTrack(
  peerConnection: RTCPeerConnection,
  newStream: MediaStream
): Promise<void> {
  const videoTrack = newStream.getVideoTracks()[0];
  const sender = peerConnection
    .getSenders()
    .find((s) => s.track?.kind === "video");

  if (sender && videoTrack) {
    await sender.replaceTrack(videoTrack);
  }
}
