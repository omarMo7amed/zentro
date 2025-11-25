import { MessageSquare, Sparkles, Video } from "lucide-react";
import { FeatureType } from "@/widgets/about-section";

export const features: FeatureType[] = [
  {
    icon: Video,
    title: "Crystal Clear Video Calls",
    description:
      "Experience HD video conferencing with up to 100 participants. Our advanced technology ensures smooth, lag-free calls with intelligent bandwidth optimization.",
    highlights: [
      "Up to 5 participants per call",
      "HD video quality",
      "Screen sharing & recording",
      "Virtual backgrounds",
    ],
    image: "/demo.png",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Team Chat",
    description:
      "Stay connected with your team through instant messaging. Organize conversations in channels, share files, and collaborate seamlessly in real-time.",
    highlights: [
      "Unlimited channels & DMs",
      "File sharing up to 1GB",
      "Message history & search",
      "Rich text formatting",
    ],
    image: "/demo2.png",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Intelligence",
    description:
      "Leverage cutting-edge AI to enhance your productivity. Get smart meeting summaries, automated transcriptions, and intelligent task extraction.",
    highlights: [
      "Meeting transcriptions",
      "Smart summaries",
      "Task extraction",
      "Translation support",
    ],
    image: "/demo.png",
  },
];
