'use client';
import { useEffect, useState } from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/registry/codeblock/codeblock';
import { AvatarInColor } from '@/registry/colored-avatar/colored-avatar';
import { CurrencyInput } from '@/registry/currency-input/currency-input';
import { Textarea } from '@/registry/lined-textarea/lined-textarea';

export default function Home() {
  const [textAreaValue, setTextAreaValue] = useState(
    "function test() {\n  const message = 'lorem ipsum...';\n  return message;\n}\n",
  );
  const [baseUrl, setBaseUrl] = useState('http://localhost:3000');
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const configs: {
    name: string;
    description: string;
    component: React.ReactNode;
  }[] = [
    {
      name: 'currency-input',
      description: 'Currency Input in Japanese-YEN',
      component: <CurrencyInput defaultValue={123456} />,
    },
    {
      name: 'lined-textarea',
      description: 'Textarea with line numbers',
      component: (
        <Textarea
          wrapperClassName="w-full px-2"
          className="h-60"
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
        />
      ),
    },
    {
      name: 'colored-avatar',
      description: 'Avatar with computed color',
      component: <AvatarInColor text="ST" className="size-16 text-2xl" />,
    },
    {
      name: 'codeblock',
      description: 'Code Block with Syntax Highlighting',
      component: (
        <CodeBlock
          language="typescript"
          fileName="src/index.ts"
          code='const message: string = "lorem ipsum...";'
        />
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex gap-1">
        <div className="flex-col">
          <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
          <p className="text-muted-foreground">
            A custom registry for distributing code using shadcn.
          </p>
        </div>
        <div className="flex flex-col ml-auto">
          <ModeToggle />
        </div>
      </header>

      <main className="flex flex-col flex-1 gap-8">
        {configs.map(({ name, description, component }) => (
          <div
            key={name}
            className="flex flex-col gap-4 border rounded-lg p-4 min-h-16 relative"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm text-muted-foreground sm:pl-3">
                {description}
              </h2>
            </div>
            <div className="my-2 flex flex-col gap-2">
              <CodeBlock
                language="bash"
                code={`pnpm dlx shadcn@latest add ${baseUrl}/r/${name}.json`}
              />
            </div>
            <Separator />
            <div className="my-2 flex items-center justify-center min-h-8 relative">
              {component}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
