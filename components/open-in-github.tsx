import { SiGithub } from '@icons-pack/react-simple-icons';
import { Button } from '@/components/ui/button';

export function OpenInGithub() {
  return (
    <Button
      variant="ghost"
      className="text-xs"
      onClick={() => {
        window.open('https://github.com/luthpg/shadcn', '_blank');
      }}
    >
      <SiGithub /> Open in GitHub
    </Button>
  );
}
