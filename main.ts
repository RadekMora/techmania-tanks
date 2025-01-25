namespace SpriteKind {
    export const Mraky = SpriteKind.create()
    export const Enemy_Projectile = SpriteKind.create()
}
sprites.onDestroyed(SpriteKind.Enemy_Projectile, function (sprite) {
    sprites.destroy(textSprite)
    Kdo = 0
    sipka = randint(-100, 100)
    Text_sprite(sipka)
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`oblouk levý0`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Jiný_tank)
    })
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Kdo == 0) {
        if (Tank_americký.pow < 250) {
            Tank_americký.pow += 1
        }
    } else if (Kdo == 1) {
        if (Jiný_tank.pow < 250) {
            Jiný_tank.pow += 1
        }
    } else {
    	
    }
})
scene.onOverlapTile(SpriteKind.Enemy_Projectile, assets.tile`Stěna Levá`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Tank_americký)
    })
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`vrchol`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Jiný_tank)
    })
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Kdo == 0) {
        console.logValue("Energy", Tank_americký.pow)
        console.logValue("uhel", Tank_americký.angle)
    } else if (Kdo == 1) {
    	
    } else {
        console.logValue("Energy", Jiný_tank.pow)
        console.logValue("uhel", Jiný_tank.angle)
    }
})
scene.onHitWall(SpriteKind.Enemy_Projectile, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Tank_americký)
    })
})
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Kdo == 0) {
        if (Tank_americký.pow < 250) {
            Tank_americký.pow += 1
        }
    } else if (Kdo == 1) {
        if (Jiný_tank.pow < 250) {
            Jiný_tank.pow += 1
        }
    } else {
    	
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Kdo == 0) {
        Kdo = 2
        myBall = carnival.createProjectileBallFromSprite(assets.image`střela`, Tank_americký, SpriteKind.Projectile)
        animation.runImageAnimation(
        myBall,
        assets.animation`letící střela`,
        80,
        true
        )
        scene.cameraFollowSprite(myBall)
        myBall.vx += sipka
    } else if (Kdo == 1) {
        Kdo = 2
        myBall2 = carnival.createProjectileBallFromSprite(assets.image`nemecka strela`, Jiný_tank, SpriteKind.Enemy_Projectile)
        animation.runImageAnimation(
        myBall2,
        assets.animation`Německá blikající střela`,
        450,
        true
        )
        scene.cameraFollowSprite(myBall2)
        myBall2.vx += sipka
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    timer.after(50, function () {
        if (sprite.overlapsWith(otherSprite)) {
            sprites.destroy(sprite)
            animation.runImageAnimation(
            otherSprite,
            assets.animation`výbuch tanku`,
            500,
            false
            )
            pause(2000)
            sprites.destroy(otherSprite)
            game.setGameOverMessage(false, "Američani prohráli")
            game.gameOver(false)
        }
    })
})
function Start_Kola (num: number) {
    scene.setBackgroundColor(6)
    tiles.setCurrentTilemap(Mapa._pickRandom())
    Tank_americký = carnival.create(assets.image`Americký tank`, SpriteKind.Player, randint(100, 250), 696)
    Tank_americký.setTraceMulti(carnival.Tracers.Part)
    Jiný_tank = carnival.create(assets.image`nemecký tanky`, SpriteKind.Enemy, randint(550, 700), 696)
    Jiný_tank.setTraceMulti(carnival.Tracers.Part)
    Tank_americký.traceColor = 4
    Jiný_tank.traceColor = 2
    if (0 == num) {
        scene.cameraFollowSprite(Tank_americký)
    } else if (1 == num) {
    	
    } else {
        scene.cameraFollowSprite(Jiný_tank)
    }
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Kdo == 0) {
        if (Tank_americký.angle > 0) {
            Tank_americký.angle += -3
        }
    } else if (Kdo == 1) {
        if (Jiný_tank.angle > 0) {
            Jiný_tank.angle += -3
        }
    } else {
    	
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Kdo == 0) {
        if (Tank_americký.angle < 180) {
            Tank_americký.angle += 3
        }
    } else if (Kdo == 1) {
        if (Jiný_tank.angle < 180) {
            Jiný_tank.angle += 3
        }
    } else {
    	
    }
})
scene.onOverlapTile(SpriteKind.Enemy_Projectile, assets.tile`Levý kopec`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Tank_americký)
    })
})
sprites.onOverlap(SpriteKind.Enemy_Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    animation.runImageAnimation(
    otherSprite,
    assets.animation`výbuch tanku`,
    500,
    false
    )
    pause(2000)
    sprites.destroy(otherSprite)
    game.setGameOverMessage(true, "Němci vyhráli")
    game.gameOver(true)
})
function Text_sprite (num: number) {
    textSprite = textsprite.create("" + Math.abs(num) + "km/h")
    if (num < 0) {
        textSprite.setIcon(assets.image`Left`)
    } else if (num == 0) {
        textSprite.setIcon(assets.image`Bez větří`)
    } else {
        textSprite.setIcon(assets.image`Right`)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Kdo == 0) {
        if (Tank_americký.angle > 0) {
            Tank_americký.angle += -3
        }
    } else if (Kdo == 1) {
        if (Jiný_tank.angle > 0) {
            Jiný_tank.angle += -3
        }
    } else {
    	
    }
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`Stěna Levá`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Jiný_tank)
    })
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`Levý kopec`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Jiný_tank)
    })
})
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Kdo == 0) {
        if (Tank_americký.pow > 51) {
            Tank_americký.pow += -1
        }
    } else if (Kdo == 1) {
        if (Jiný_tank.pow > 51) {
            Jiný_tank.pow += -1
        }
    } else {
    	
    }
})
scene.onOverlapTile(SpriteKind.Enemy_Projectile, assets.tile`Stěna Pravá`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Tank_americký)
    })
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`sikmina_prava`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Jiný_tank)
    })
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Kdo == 0) {
        if (Tank_americký.pow > 51) {
            Tank_americký.pow += -1
        }
    } else if (Kdo == 1) {
        if (Jiný_tank.pow > 51) {
            Jiný_tank.pow += -1
        }
    } else {
    	
    }
})
sprites.onOverlap(SpriteKind.Enemy_Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    timer.after(50, function () {
        if (sprite.overlapsWith(otherSprite)) {
            sprites.destroy(sprite)
            animation.runImageAnimation(
            otherSprite,
            assets.animation`výbuch německého tanku`,
            500,
            false
            )
            pause(2000)
            sprites.destroy(otherSprite)
            game.setGameOverMessage(false, "Němci prohráli")
            game.gameOver(false)
        }
    })
})
scene.onOverlapTile(SpriteKind.Enemy_Projectile, assets.tile`oblouk pravý`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Tank_americký)
    })
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Jiný_tank)
    })
})
scene.onOverlapTile(SpriteKind.Enemy_Projectile, assets.tile`vrchol`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Tank_americký)
    })
})
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    sprites.destroy(textSprite)
    Kdo = 1
    sipka = randint(-100, 100)
    Text_sprite(sipka)
})
scene.onOverlapTile(SpriteKind.Enemy_Projectile, assets.tile`oblouk levý0`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Tank_americký)
    })
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    animation.runImageAnimation(
    otherSprite,
    assets.animation`výbuch německého tanku`,
    500,
    false
    )
    pause(2000)
    sprites.destroy(otherSprite)
    game.setGameOverMessage(true, "Američani vyhráli")
    game.gameOver(true)
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`oblouk pravý`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Jiný_tank)
    })
})
scene.onOverlapTile(SpriteKind.Enemy_Projectile, assets.tile`sikmina_prava`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Tank_americký)
    })
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`Stěna Pravá`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 100)
    timer.after(delay, function () {
        scene.cameraFollowSprite(Jiný_tank)
    })
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Kdo == 0) {
        if (Tank_americký.angle < 180) {
            Tank_americký.angle += 3
        }
    } else if (Kdo == 1) {
        if (Jiný_tank.angle < 180) {
            Jiný_tank.angle += 3
        }
    } else {
    	
    }
})
let myBall2: Ball = null
let myBall: Ball = null
let textSprite: TextSprite = null
let Jiný_tank: Ball = null
let Tank_americký: Ball = null
let delay = 0
let sipka = 0
let Kdo = 0
let Mapa: tiles.TileMapData[] = []
Mapa = [tilemap`level0`, tilemap`Vzor`]
Kdo = randint(0, 1)
sipka = randint(-100, 100)
Start_Kola(Kdo)
Text_sprite(sipka)
delay = 200
Tank_americký.pow = 100
Jiný_tank.pow = 100
Tank_americký.angle = 0
Jiný_tank.angle = 180
game.onUpdate(function () {
    textSprite.setPosition(scene.cameraProperty(CameraProperty.X) + 50, scene.cameraProperty(CameraProperty.Y) - 55)
    textSprite.setMaxFontHeight(5)
})
