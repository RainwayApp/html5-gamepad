import SingleGamepad from './single-gamepad'

type GamepadEvent = Event & { gamepad: Gamepad }

var gamepads: (SingleGamepad | undefined)[] = []
export default gamepads

window.addEventListener('gamepadconnected', function(e: GamepadEvent) {
    console.log(
        'Gamepad connected at index %d: %s. %d buttons, %d axes.',
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length
    )
    gamepads[e.gamepad.index] = new SingleGamepad(e.gamepad)
})

window.addEventListener('gamepaddisconnected', function(e: GamepadEvent) {
    console.log('Gamepad disconnected from index %d: %s', e.gamepad.index, e.gamepad.id)
    gamepads[e.gamepad.index] = undefined
})

if (typeof navigator.getGamepads === 'function') {
    Array.prototype.slice.call(navigator.getGamepads()).forEach(function(gp: Gamepad) {
        if (!gp) {
            return
        }
        gamepads[gp.index] = new SingleGamepad(gp)
        console.log(gamepads)
    })
} else {
    console.warn('This browser does not support gamepads.')
}
