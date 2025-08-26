import { OpenInV0Button } from '@/components/open-in-v0-button';
import { AvatarInColor } from '@/registry/colored-avatar/colored-avatar';
import { CurrencyInput } from '@/registry/currency-input/currency-input';
import { Textarea } from '@/registry/lined-textarea/lined-textarea';

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Currency Input in Japanese-YEN
            </h2>
            <OpenInV0Button name="currency-input" className="w-fit" />
          </div>
          <div>
            <CodeBlock />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <CurrencyInput defaultValue={123456} />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Avatar with computed color
            </h2>
            <OpenInV0Button name="colored-avatar" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <AvatarInColor text="ST" className="size-16 text-2xl" />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Textarea with line numbers
            </h2>
            <OpenInV0Button name="lined-textarea" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <Textarea
              wrapperClassName="w-full px-2"
              className="h-60"
              value={
                "function test() {\n  const message = 'lorem ipsum...';\n  return message;\n}\n"
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}
