/* Type declarations for gsap-trial club plugins */
declare module "gsap-trial/SplitText" {
  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(target: any, vars?: any);
    revert(): void;
  }
}

declare module "gsap-trial/ScrollSmoother" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export class ScrollSmoother {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static create(vars?: any): ScrollSmoother;
    paused(value: boolean): void;
    scrollTop(value?: number): number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scrollTo(target: any, smooth?: boolean, position?: string): void;
    kill(): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    effects(targets?: any, vars?: any): any;
  }
}
