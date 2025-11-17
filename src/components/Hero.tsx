import Image from 'next/image'

import { Button } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurCyanImage from '@/images/blur-cyan.png'

export function Hero() {
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mt-19 dark:-mb-32 dark:pt-19 dark:pb-32">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-8 xl:px-12">
          <div className="relative z-10 text-center">
            <Image
              className="absolute right-full bottom-full -mr-72 -mb-56 opacity-50"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority
            />
            <div className="relative">
              <div className="absolute inset-x-[-50vw] -top-32 -bottom-48 mask-[linear-gradient(transparent,white,white)] lg:-top-32 lg:right-0 lg:-bottom-32 lg:left-[calc(50%+14rem)] lg:mask-none dark:mask-[linear-gradient(transparent,white,transparent)] lg:dark:mask-[linear-gradient(white,white,transparent)]">
                <HeroBackground className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
              </div>
              <p className="inline bg-linear-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                UAV 4 Everyone.
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-400">
                A cutting-edge collaborative platform for UAV data sharing and
                open-source innovation, connecting academia, industries, and
                governmental agencies to foster unprecedented synergy.
              </p>
              <div className="mt-8 flex gap-4 justify-center">
                <Button href="https://github.com/uav-4-everyone/platform" variant="secondary">
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
