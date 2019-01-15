declare namespace RainwayGamepad {
    type Range = [number, number]
    type Axis =
        | { index: number; from: Range; to: Range }
        | { index: number; negative?: true }
        | { buttonAnalog?: number; buttonPositive?: number; buttonNegative?: number }

    interface Axes {
        'left stick x'?: Axis
        'left stick y'?: Axis
        'right stick x'?: Axis
        'right stick y'?: Axis
        'dpad x'?: Axis
        'dpad y'?: Axis
        'left trigger'?: Axis
        'right trigger'?: Axis
    }

    type Button = { index: number } | { axis: number; range: Range } | { axis: number; direction: number }

    interface Buttons {
        a?: Button
        b?: Button
        x?: Button
        y?: Button
        'left shoulder'?: Button
        'right shoulder'?: Button
        back?: Button
        start?: Button
        home?: Button
        'left stick'?: Button
        'right stick'?: Button
        'left stick x'?: Button
        'left stick y'?: Button
        'right stick x'?: Button
        'right stick y'?: Button
        'dpad x'?: Button
        'dpad y'?: Button
        'left trigger'?: Button
        'right trigger'?: Button
    }

    interface Platform {
        browser: string
        id: string
        os: string
    }

    interface Mapping {
        axes: Axes
        buttons: Buttons
        name: string
        supported: Platform[]
    }
}

declare module '*.json' {
    const mapping: RainwayGamepad.Mapping
    export default mapping
}
