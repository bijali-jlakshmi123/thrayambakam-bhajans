import { create } from "zustand";

interface Track {
  id: string;
  title: string;
  singer: string;
  audioUrl: string;
  categoryId?: string;
}

interface AudioState {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;

  setTrack: (track: Track, playlist?: Track[]) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  togglePlay: () => void;
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  playlist: [],
  isPlaying: false,
  volume: 0.7,
  progress: 0,
  duration: 0,

  setTrack: (track, playlist = []) =>
    set({
      currentTrack: track,
      playlist: playlist.length > 0 ? playlist : get().playlist,
      isPlaying: true,
      progress: 0,
    }),

  nextTrack: () => {
    const { currentTrack, playlist } = get();
    if (!currentTrack || playlist.length === 0) return;

    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    set({ currentTrack: playlist[nextIndex], isPlaying: true, progress: 0 });
  },

  previousTrack: () => {
    const { currentTrack, playlist } = get();
    if (!currentTrack || playlist.length === 0) return;

    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    set({ currentTrack: playlist[prevIndex], isPlaying: true, progress: 0 });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
}));
