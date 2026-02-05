import { FileDown } from "lucide-react";

interface ResumeButtonProps {
  url: string;
}

export default function ResumeButton({ url }: ResumeButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="group flex w-full items-center justify-center gap-3 rounded-full bg-theme-accent px-6 py-4 font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
    >
      <FileDown className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
      <span>Download Resume</span>
    </a>
  );
}
