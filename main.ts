namespace SpriteKind {
    export const Killer = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Portal = SpriteKind.create()
    export const SPACWSHIP = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 9 9 9 9 f 9 . 
        . . 9 9 9 f f f 9 9 9 9 9 9 9 9 
        9 9 9 9 9 9 9 9 9 9 9 f f f 9 . 
        . . . . . . . . . 9 9 9 9 9 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Shooter, 300, 0)
})
sprites.onOverlap(SpriteKind.SPACWSHIP, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(Meteoroids)
    info.changeLifeBy(-2)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 4318, 255, 141, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    game.setGameOverPlayable(false, music.melodyPlayable(music.wawawawaa), false)
})
sprites.onOverlap(SpriteKind.Killer, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(Meteoroids)
    info.changeLifeBy(-1)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 4318, 255, 141, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    game.setGameOverPlayable(false, music.melodyPlayable(music.wawawawaa), false)
    music.stopAllSounds()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Astronaut2.vy = -150
})
sprites.onOverlap(SpriteKind.SPACWSHIP, SpriteKind.Coin, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(otherSprite)
    info.changeScoreBy(5)
    info.changeLifeBy(1)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 4318, 255, 141, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    sprites.destroy(Astronaut2)
    game.gameOver(true)
    game.setGameOverMessage(true, "GAME OVER, YOU WON THE GAME!")
})
function LEVEL1 () {
    let Current_Level = 0
    game.showLongText("Level 1", DialogLayout.Bottom)
    game.showLongText("Let's Start", DialogLayout.Bottom)
    game.showLongText("Rules:- 1) In level 1, you have to dodge the asteroids using the Arrows or the WASD keys.", DialogLayout.Center)
    game.showLongText("2) The icon with dollar sign on it represents the Coin through which we can gain 1 point.", DialogLayout.Center)
    game.showLongText("3) After scoring 5 points in 30 seconds, a portal will appear, go inside the portal to win.", DialogLayout.Center)
    effects.starField.startScreenEffect()
    Astronaut = sprites.create(assets.image`myImage11`, SpriteKind.Killer)
    Astronaut.setStayInScreen(true)
    controller.moveSprite(Astronaut, 71, 50)
    Astronaut.setPosition(6, 300)
    if (Current_Level == 0) {
        tiles.setCurrentTilemap(tilemap`level1`)
    } else if (Current_Level == 1) {
        tiles.setCurrentTilemap(tilemap`level2`)
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            sprites.destroy(Meteoroids)
        }
    } else {
    	
    }
    info.setLife(5)
    info.setScore(0)
    info.startCountdown(30)
}
sprites.onOverlap(SpriteKind.Killer, SpriteKind.Coin, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 4318, 255, 141, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.SPACWSHIP, SpriteKind.Portal, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(Shooter)
    sprites.destroy(projectile)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 4318, 255, 141, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    game.setGameOverPlayable(false, music.melodyPlayable(music.wawawawaa), false)
    music.stopAllSounds()
    game.showLongText("You have completed the Level 2, let's go to Level 3 ", DialogLayout.Bottom)
    music.play(music.createSong(hex`0078000408020304001c00100500640000041e000004000000000000000000000000000a04000440000000040002242704000800012a08000c0001241000140002222c18001c00012920002400012028002c00031d20243000340001273400380001193c004000012405001c000f0a006400f4010a00000400000000000000000000000000000000025b0008000c00012a10001400012714001800012c18001c0001251c0020000325292c200024000325292c2400280002292c28002c0002292c2c00300002292c3000340002292c34003800031d222c38003c0001253c004000041d20272a08001c000e050046006603320000040a002d00000064001400013200020100024e0004000800012508000c00021d2c0c001000011914001800031b202718001c00012c1c00200001192400280003191d242c00300002202530003400011b34003800012038003c0001293c0040000119`), music.PlaybackMode.LoopingInBackground)
    game.showLongText("Rules: - 1) Climb all the surfaces and reach the moon using the WASD keys.", DialogLayout.Bottom)
    game.showLongText("2) Reach the moon and wait to finish the game.", DialogLayout.Bottom)
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        sprites.destroy(value)
    }
    for (let value of sprites.allOfKind(SpriteKind.Coin)) {
        sprites.destroy(value)
    }
    info.startCountdown(100)
    Astronaut2 = sprites.create(assets.image`myImage11`, SpriteKind.Player)
    Astronaut2.setStayInScreen(true)
    controller.moveSprite(Astronaut2)
    Astronaut2.setPosition(4, 59)
    controller.moveSprite(Astronaut2, 70, 70)
    Astronaut2.setStayInScreen(true)
    Astronaut2.setPosition(26, 110)
    Astronaut2.ay = 200
    Astronaut2.vy = 0
    scene.cameraFollowSprite(Astronaut2)
    tiles.setCurrentTilemap(tilemap`level13`)
})
info.onScore(5, function () {
    Portal = sprites.create(assets.image`myImage8`, SpriteKind.Portal)
    Portal.setPosition(randint(10, 145), 10)
    Portal.setVelocity(0, 50)
})
sprites.onOverlap(SpriteKind.Killer, SpriteKind.Portal, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(Astronaut)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 4318, 255, 141, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    game.setGameOverPlayable(false, music.melodyPlayable(music.wawawawaa), false)
    music.stopAllSounds()
    game.showLongText("You have completed the Level 1, let's go to Level 2 ", DialogLayout.Bottom)
    music.play(music.createSong(hex`0078000408020304001c00100500640000041e000004000000000000000000000000000a04000440000000040002242704000800012a08000c0001241000140002222c18001c00012920002400012028002c00031d20243000340001273400380001193c004000012405001c000f0a006400f4010a00000400000000000000000000000000000000025b0008000c00012a10001400012714001800012c18001c0001251c0020000325292c200024000325292c2400280002292c28002c0002292c2c00300002292c3000340002292c34003800031d222c38003c0001253c004000041d20272a08001c000e050046006603320000040a002d00000064001400013200020100024e0004000800012508000c00021d2c0c001000011914001800031b202718001c00012c1c00200001192400280003191d242c00300002202530003400011b34003800012038003c0001293c0040000119`), music.PlaybackMode.LoopingInBackground)
    game.showLongText("Rules:- 1) Dodge and destroy all the asteroids to gain points using the shooter by pressing the B button or Enter key.", DialogLayout.Bottom)
    game.showLongText("2) The icon with dollar sign on it represents the Coin through which we can gain 5 points.", DialogLayout.Bottom)
    game.showLongText("3) In the last 5 Sec. you have to go inside a portal by which you can go to level 3 otherwise you will lose. ", DialogLayout.Bottom)
    info.setScore(0)
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        sprites.destroy(value)
    }
    for (let value of sprites.allOfKind(SpriteKind.Coin)) {
        sprites.destroy(value)
    }
    Astronaut.setStayInScreen(true)
    tiles.setCurrentTilemap(tilemap`level4`)
    info.startCountdown(30)
    Shooter = sprites.create(assets.image`myImage10`, SpriteKind.SPACWSHIP)
    Shooter.setStayInScreen(true)
    controller.moveSprite(Shooter)
    Shooter.setPosition(4, 59)
    controller.moveSprite(Shooter, 70, 70)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Coin, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(otherSprite)
    info.changeScoreBy(5)
    info.changeLifeBy(1)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 4318, 255, 141, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(Meteoroids)
    info.changeScoreBy(1)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 4318, 255, 141, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    game.setGameOverPlayable(false, music.melodyPlayable(music.wawawawaa), false)
    game.setGameOverMessage(false, "You have completed the Level 2, let's go to Level 3.")
})
let Coins: Sprite = null
let Portal: Sprite = null
let Astronaut: Sprite = null
let Astronaut2: Sprite = null
let Meteoroids: Sprite = null
let Shooter: Sprite = null
let projectile: Sprite = null
music.play(music.createSong(hex`0078000408020304001c00100500640000041e000004000000000000000000000000000a04000440000000040002242704000800012a08000c0001241000140002222c18001c00012920002400012028002c00031d20243000340001273400380001193c004000012405001c000f0a006400f4010a00000400000000000000000000000000000000025b0008000c00012a10001400012714001800012c18001c0001251c0020000325292c200024000325292c2400280002292c28002c0002292c2c00300002292c3000340002292c34003800031d222c38003c0001253c004000041d20272a08001c000e050046006603320000040a002d00000064001400013200020100024e0004000800012508000c00021d2c0c001000011914001800031b202718001c00012c1c00200001192400280003191d242c00300002202530003400011b34003800012038003c0001293c0040000119`), music.PlaybackMode.LoopingInBackground)
game.showLongText("Welcome to Lunar Odyssey,", DialogLayout.Center)
scene.setBackgroundImage(assets.image`grdhtyuiop`)
LEVEL1()
game.onUpdateInterval(2000, function () {
    Coins = sprites.create(assets.image`myImage7`, SpriteKind.Coin)
    Coins.setPosition(randint(10, 145), 10)
    Coins.setVelocity(0, 50)
})
game.onUpdateInterval(1000, function () {
    Meteoroids = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f f f f f f . . . . 
        . . . f e e e e e e e e f . . . 
        . . f e e e f f f f e e f . . . 
        . f e e e f f f f f e e e f . . 
        . f e e f f e e e e e e e f f . 
        f e e e f f e e e e e e e e f f 
        f e e e f e e e e e e f e f e f 
        f e f e e e f f e e f f e f e f 
        f e f f e e f f f e f f e f e f 
        f e e e e e e e f e e e e e e f 
        f e e e f f e e e e e e e e f f 
        f e e e f f e e e e e e f f f . 
        . f e e e f f e e e e e f f f . 
        . . f e e e e e e e f f f f . . 
        . . . f f f f f f f f f f . . . 
        `, SpriteKind.Enemy)
    Meteoroids.setPosition(randint(20, 145), 10)
    Meteoroids.setVelocity(0, 50)
})
game.onUpdateInterval(1000, function () {
    Meteoroids = sprites.create(assets.image`myImage5`, SpriteKind.Enemy)
    Meteoroids.setPosition(randint(20, 145), 10)
    Meteoroids.setVelocity(0, 50)
})
game.onUpdateInterval(40000, function () {
    Portal = sprites.create(assets.image`myImage8`, SpriteKind.Portal)
    Portal.setPosition(randint(20, 145), 10)
    Portal.setVelocity(0, 50)
})
