interface Product {
    id: string // 4 hex digits
    name: string // friendly name
}

interface Vendor {
    id: string // 4 hex digits
    name: string // friendly name
    products: Product[]
}

const vendors: Vendor[] = [
    {
        id: '054c',
        name: 'Sony',
        products: [
            { id: '0268', name: 'DualShock 3' },
            { id: '05c4', name: 'DualShock 4' },
            { id: '09cc', name: 'DualShock 4 (v2)' },
        ],
    },
    {
        id: '2dc8',
        name: '8Bitdo',
        products: [{ id: '6101', name: 'N30 Pro' }],
    },
    {
        id: '955',
        name: 'NVIDIA',
        products: [{ id: 'b400', name: 'NVIDIA Shield' }],
    },
    {
        id: '2563',
        name: 'ShanWan',
        products: [{ id: '0523', name: 'ShanWan PS3' }],
    },
    {
        id: '045e',
        name: 'Microsoft',
        products: [
            { id: '02d1', name: 'Xbox One Controller' },
            { id: '02dd', name: 'Xbox One Controller' },
            { id: '02e3', name: 'Xbox One Elite Controller' },
            { id: '02ea', name: 'Xbox One S Controller' },
            { id: '02fd', name: 'Xbox One S Controller' },
            { id: '028f', name: 'Xbox 360 Controller' },
            { id: '028e', name: 'Xbox 360 Controller' },
            { id: '0289', name: 'Xbox Controller S' },
            { id: '0285', name: 'Xbox Controller S' },
            { id: '0202', name: 'Xbox Controller' },
        ],
    },
    {
        id: '046d',
        name: 'Logitech',
        products: [
            { id: 'c299', name: 'G25 Racing Wheel' },
            { id: 'c29B', name: 'G27 Racing Wheel' },
            { id: 'caa3', name: 'DriveFX Racing Wheel' },
            { id: 'c295', name: 'Momo Force Steering Wheel' },
            { id: 'c298', name: 'Driving Force Pro' },
        ],
    },
]

// Turn a gamepad ID like "Wireless Controller-054c-09cc" into a human-readable string
// clearly identifying the controller type, like "DualShock 4 (v2)".
export function friendlyGamepadName(gamepadId: Gamepad['id']): string {
    if (!gamepadId) {
        return 'USB Controller'
    }

    for (const vendor of vendors) {
        for (const product of vendor.products) {
            // A case-insensitive regular expression, looking for:
            //   * the vendor ID, surrounded by word boundaries (\b), followed by
            //   * one or more characters, followed by
            //   * the product ID, surrounded by word boundaries (\b).
            const re = RegExp(String.raw`\b${vendor.id}\b.+\b${product.id}\b`, 'i')

            if (re.test(gamepadId)) {
                return product.name
            }
        }
    }

    // Maybe the vendor/product numbers are absent? Try some dead simple fallbacks:
    if (/xbox ?360/i.test(gamepadId)) {
        return 'Xbox 360 Controller'
    } else if (/xbox/i.test(gamepadId)) {
        return 'Xbox Controller'
    } else if (/dualshock/i.test(gamepadId)) {
        return 'DualShock'
    }

    // Default to the first word in the string.
    return gamepadId.split(' ')[0]
}
