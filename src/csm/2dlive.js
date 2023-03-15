import jQuery from 'jquery';
// import './de_aztec.map';
// import './keyboard'
// import './jquery-1.7.1-binary-ajax'
// import './jdataview'
// import './jquery.sort'



export const init2d = (d,w) => {



    var EventArgs = function() {
        function a() {}
        return a
    }(),
    __extends = w.__extends || function(a, b) {
        function c() {
            w.constructor = a
        }
        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        c.prototype = Object.create(b.prototype);
        a.prototype = new c();
    },


    AssetEventArgs = function(a) {
        function b(b) {
            a.call(w); // Cambiar a.call(w) a a.call(this)
            this.asset = b;
            this.status = "loading";
        }
        return __extends(b, a), b.prototype.setAssetSrc = function(a) {
            w.asset = a
        }, b.prototype.getAssetSrc = function() {
            return w.asset
        }, b.prototype.setStatus = function(a) {
            w.status = a
        }, b.prototype.getStatus = function() {
            return w.status
        }, b
    }(EventArgs),
    EventDispatcher = function() {
        function a() {
            w.eventMap = {}
          }

          a.prototype.bind = function(a, b) {
            w.eventMap[a] || (w.eventMap[a] = []);
            if (w.eventMap[a].indexOf(b) === -1) {
              w.eventMap[a].push(b);
            }
          };

          a.prototype.fire = function(a, b, c) {
            if (console.log("Firing event " + a), w.eventMap[a]) {
              for (var d = 0; d < w.eventMap[a].length; d++) {
                w.eventMap[a][d](b, c);
              }
            }
          };

          a.prototype.setContainer = function(a) {
            w.container = a
          };

          a.prototype.getContainer = function() {
            return w.container
          };

          a.getInstance = function() {
            return a.instance || (a.instance = new a()), a.instance
          };

          return a;
    }(),
    GameState = function() {
        function a(a) {
            w.stateID = a
        }
        return a.prototype.getID = function() {
            return w.stateID
        }, a.prototype.init = function(a, b) {}, a.prototype.enter = function(a, b) {}, a.prototype.update = function(a, b, c) {}, a.prototype.render = function(a, b, c) {}, a.prototype.leave = function(a, b) {}, a
    }(),
    Game = function() {
        function a() {
            w.states = {}
        }
        return a.prototype.setGameContainer = function(a) {
            w.container = a
        }, a.prototype.getGameContainer = function() {
            return w.container
        }, a.prototype.init = function() {}, a.prototype.initStates = function() {}, a.prototype.addState = function(a) {
            if (w.container && w) {
                a.init(w.container, w);
                w.states[a.getID()] = a;
            }
        }, a.prototype.enterState = function(a) {
            if (w.currentState != a) {
                if (null != w.currentState) {
                    w.currentState.leave(w.container, w);
                }

                if (null == w.states[a]) {
                    console.error("No game state with ID " + a);
                    return;
                }

                w.currentState = w.states[a];
                console.log("Entering state...");
                w.currentState.enter(w.container, w);
            }
        }, a.prototype.getState = function(a) {
            return "undefined" == typeof a && (a = NaN), isNaN(a) ? w.currentState : w.states[a]
        }, a
    }(),
    GameContainer = function(canvas, game) {
        function GameContainerConstructor(context, game) {
            w.context = context;
            w.game = game;
            w.eventDispatcher = EventDispatcher.getInstance();
            w.eventDispatcher.setContainer(w);
            w.assetHolder = AssetHolder.getInstance();
            w.assetHolder.setContainer(w);
            w.updateRate = 1;
            w.isExit = false;
            window.eventDispatcher = EventDispatcher.getInstance();
        }

        GameContainerConstructor.prototype.getContext = function() {
            return w.context;
        };

        GameContainerConstructor.prototype.start = function() {
            w.game.setGameContainer(w);
            w.game.initStates();
            w.game.init();
        };

        GameContainerConstructor.prototype.render = function() {
            var a = new Date().getMilliseconds();
            var b = 0;
            if (w.time) {
                b = a - w.time;
            }
            if (b > w.updateRate) {
                w.game.getState().update(w, w.game, b);
            }
            w.context.clearRect(0, 0, w.context.canvas.width, w.context.canvas.height);
            w.game.getState().render(w, w.game, w.context);
            w.time = a;
        };

        GameContainerConstructor.prototype.getEventDispatcher = function() {
            return w.eventDispatcher;
        };

        GameContainerConstructor.prototype.getAssetHolder = function() {
            return w.assetHolder;
        };

        GameContainerConstructor.prototype.exit = function() {
            w.isExit = true;
        };

        return new GameContainerConstructor(canvas, game);
    }(),
    AssetHolder = function() {
        function a() {
            w.assets = {}
        }
        return a.prototype.getAsset = function(a) {
            return w.assets[a] ? w.assets[a] : w.loadImage(a)
        }, a.prototype.loadImage = function(a) {
            var c = new AssetEventArgs(a);
            w.gameContainer.getEventDispatcher().fire("assetLoading", w, c);
            var img = new Image();
            img.src = a;
            var that = this;
            img.onload = function() {
                that.addAsset(a, img);
                c.setStatus("loaded");
                w.gameContainer.getEventDispatcher().fire("assetLoaded", w, c);
            };
            img.onerror = function() {
                throw new Error("Could not load asset " + a + ". ");
            };
            return img;
        }, a.prototype.loadSound = function(a) {
            throw new Error("Loading sound files is not supported yet.");
        }, a.prototype.addAsset = function(a, b) {
            w.assets[a] = b
        }, a.prototype.setContainer = function(a) {
            w.gameContainer = a
        }, a.prototype.getContainer = function() {
            return w.gameContainer
        }, a.getInstance = function() {
            return a.instance || (a.instance = new a()), a.instance
        }, a
    }(),
    MapPoint = function() {
        function a(x, y, under) {
            w.x = x;
            w.y = y;
            w.under = under;
        }
        a.prototype.isUnder = function() {
            return w.under;
        };
        a.prototype.near = function(otherPoint) {
            return (
                otherPoint.y <= w.y + 3 &&
                w.y - 3 <= otherPoint.y &&
                otherPoint.x <= w.x + 3 &&
                w.x - 3 <= otherPoint.x &&
                w.under == otherPoint.isUnder()
            );
        };
        return a;
    }(),
    Entity = function() {
        function a() {}
        return a.prototype.update = function(a) {}, a.prototype.draw = function(a) {}, a.prototype.setWidth = function(a) {
            w.width = a
        }, a.prototype.getWidth = function() {
            return w.width
        }, a.prototype.setHeight = function(a) {
            w.height = a
        }, a.prototype.getHeight = function() {
            return w.height
        }, a.prototype.setLocation = function(a) {
            w.location = a
        }, a.prototype.getLocation = function() {
            return w.location
        }, a.prototype.setVisible = function(a) {
            w.visible = a
        }, a.prototype.isVisible = function() {
            return w.visible
        }, a
    }(),
    Bomb = function(a) {
        function b() {
            a.call(this);
            this.setPlanted(false);
            this.setDropped(false);
        }
        return __extends(b, a), b.prototype.draw = function(a) {
            var c = 1;
            if (this.getLocation().isUnder()) {
                c *= .33;
            }
            a.save();
            a.strokeStyle = "black";
            a.lineWidth = 2;
            if (this.isPlanted()) {
                a.fillStyle = "rgba(" + b.COLOR_PLANTED + ", " + c + ")";
            } else if (this.isDropped()) {
                a.fillStyle = "rgba(" + b.COLOR_DROPPED + ", " + c + ")";
            }
            a.beginPath();
            a.rect(this.getLocation().x - b.WIDTH / 2, this.getLocation().y - b.HEIGHT / 2, b.WIDTH, b.HEIGHT);
            a.closePath();
            a.stroke();
            a.fill();
            a.restore();
        }, b.prototype.setPlanted = function(a) {
            w.planted = a
        }, b.prototype.isPlanted = function() {
            return w.planted
        }, b.prototype.setDropped = function(a) {
            w.dropped = a
        }, b.prototype.isDropped = function() {
            return w.dropped
        }, b.RED_LIGHT_OFFSET_X = 5, b.RED_LIGHT_OFFSET_Y = 8, b.GREEN_LIGHT_OFFSET_X = 8, b.GREEN_LIGHT_OFFSET_Y = 8, b.WIDTH = 10, b.HEIGHT = 6, b.COLOR_PLANTED = "255, 170, 0", b.COLOR_DROPPED = "255, 255, 255", b
    }(Entity),
    PlayerArgs = function(a) {
        function b(b) {
            a.call(this);
            this.player = b;
        }
        return __extends(b, a), b.prototype.setPlayer = function(a) {
            this.player = a;
        }, b.prototype.getPlayer = function() {
            return this.player;
        }, b;
    }(EventArgs),
    Weapon = function() {
        function a(a, b, c, d) {
            this.id = a;
            this.name = b;
            this.ammo = c;
            this.backup = d;
          }
        return a.fromWeapon = function(b) {
            return new a(b.getId(), b.getName(), b.getAmmo(), b.getBackup())
        }, a.prototype.getReloadTime = function() {
            return a.RELOADS[this.getId()]
        }, a.prototype.setId = function(a) {
            w.id = a
        }, a.prototype.getId = function() {
            return w.id
        }, a.prototype.setName = function(a) {
            w.name = a
        }, a.prototype.getName = function() {
            return w.name
        }, a.prototype.setAmmo = function(a) {
            w.ammo = a
        }, a.prototype.getAmmo = function() {
            return w.ammo
        }, a.prototype.setBackup = function(a) {
            w.backup = a
        }, a.prototype.getBackup = function() {
            return w.backup
        }, a.RELOAD_1 = 50, a.RELOAD_2 = 35, a.RELOAD_3 = 25, a.RELOAD_4 = 23, a.RELOAD_5 = 20, a.RELOADS = [0, a.RELOAD_4, a.RELOAD_4, a.RELOAD_3, a.RELOAD_1, a.RELOAD_2, a.RELOAD_3, a.RELOAD_2, a.RELOAD_3, a.RELOAD_4, a.RELOAD_2, a.RELOAD_2, a.RELOAD_3, a.RELOAD_5, a.RELOAD_4, a.RELOAD_4, a.RELOAD_4, a.RELOAD_3, a.RELOAD_3, a.RELOAD_2, a.RELOAD_5, a.RELOAD_3, a.RELOAD_2, a.RELOAD_3, a.RELOAD_1], a
    }(),
    Player = function(a) {
        function b(b) {
            a.call(w), w.name = b, w.team = 0, w.health = 100, w.viewAngle = 0, w.money = 800, w.kills = 0, w.deaths = 0, w.noHide = !0, w.firing = !1, w.fireDelta = 0, w.bombAction = !1, w.bombDelta = 0
        }
        return __extends(b, a), b.prototype.update = function(a) {
            w.bombAction && (w.bombDelta += a, w.bombProgress = w.bombDelta / w.bombTargetTime, w.bombProgress >= 1 && (w.bombProgress = 1, w.bombAction = !1, w.bombDelta = 0))
        }, b.prototype.draw = function(a) {
            if ((w.getNoHide() || w.isVisible() || w.isFiring()) && w.getLocation()) {
                var c = 1;
                if (w.isDead()) {
                    if (!(w.getDeathDelta() < b.AFTER_DEATH_DELAY)) return;
                    c = 1 - w.getDeathDelta() / b.AFTER_DEATH_DELAY
                } else w.getLocation().isUnder() && (c *= .33), !w.getNoHide() && w.isFiring() && (c *= 1 - w.getFireDelta() / b.AFTER_FIRE_DELAY);
                var d = 2 * Math.PI,
                    e = 0;
                a.save(), a.beginPath(), a.arc(w.getLocation().x, w.getLocation().y, b.PLAYER_RADIUS + 3, d, e, !1), a.closePath();
                var f = a.createRadialGradient(w.getLocation().x, w.getLocation().y, 1, w.getLocation().x, w.getLocation().y, b.PLAYER_RADIUS + 6);
                if (f.addColorStop(0, "rgba(50, 50, 50, " + c + ")"), f.addColorStop(1, "rgba(50, 50, 50, 0)"), a.fillStyle = "rgba(239, 242, 248, 0.2)", a.fill(), a.restore(), !w.isDead()) {
                    a.beginPath(), a.moveTo(w.getLocation().x, w.getLocation().y), a.arc(w.getLocation().x, w.getLocation().y, b.FOV_RADIUS, -(w.viewAngle * Math.PI / 180) - .25 * Math.PI, -(w.viewAngle * Math.PI / 180) + .25 * Math.PI, !1), a.closePath();
                    var g = a.createRadialGradient(w.getLocation().x, w.getLocation().y, 1, w.getLocation().x, w.getLocation().y, b.FOV_RADIUS);
                    g.addColorStop(0, "rgba(" + b.FOV_COLOR_DARK + ", 0.33)"), g.addColorStop(2 / 3, "rgba(" + b.FOV_COLOR + ", 0.33)"), g.addColorStop(1, "rgba(" + b.FOV_COLOR + ", 0)"), a.fillStyle = "rgba(239, 242, 248, 0.2)", a.fill()
                }
                a.beginPath(), a.arc(w.getLocation().x, w.getLocation().y, b.PLAYER_RADIUS, d, e, !1), a.closePath(), a.lineWidth = 2, a.strokeStyle = "rgba(0, 0, 0, " + c + ")", a.stroke(), a.fillStyle = "rgba(239, 242, 248, " + c + ")", a.fill(), d = 1.5 * Math.PI, e = d + 2 * Math.PI / 100 * w.health, a.beginPath(), a.moveTo(w.getLocation().x, w.getLocation().y), a.arc(w.getLocation().x, w.getLocation().y, b.PLAYER_RADIUS, d, e, !1), a.closePath(), a.fillStyle = "rgba(" + b.TEAM_COLORS[w.team] + ", " + c + ")", a.fill(), a.font = "bold 8px Arial", a.textAlign = "center", w.getTeam() == Clan.TEAM_CT && (a.strokeStyle = "rgba(255, 255, 255, " + c + ")"), a.strokeText(w.getName(), w.getLocation().x, w.getLocation().y - 15), a.fillText(w.getName(), w.getLocation().x, w.getLocation().y - 15), w.bombAction && !w.isDead() && (a.save(), a.beginPath(), a.rect(w.getLocation().x - 10, w.getLocation().y + 10, 20, 5), a.closePath(), a.strokeStyle = "rgba(30, 30, 30, 1)", a.stroke(), a.beginPath(), a.rect(w.getLocation().x - 10, w.getLocation().y + 10, 20 * w.bombProgress, 5), a.closePath(), a.fillStyle = "rgba(0, 200, 0, 1)", a.fill(), a.restore())
            }
        }, b.prototype.setName = function(a) {
            w.name = a
        }, b.prototype.getName = function() {
            return w.name
        }, b.prototype.setTeam = function(a) {
            w.team = a
        }, b.prototype.getTeam = function() {
            return w.team
        }, b.prototype.setHealth = function(a) {
            w.health = Math.min(Math.max(0, a), 100), w.health <= 0 ? (w.setDead(!0), EventDispatcher.getInstance().fire("playerActionDie", w, new PlayerArgs(w))) : (w.setDead(!1), w.setDeathDelta(0))
        }, b.prototype.getHealth = function() {
            return w.health
        }, b.prototype.setAngle = function(a) {
            w.viewAngle = a
        }, b.prototype.getAngle = function() {
            return w.viewAngle
        }, b.prototype.setMoney = function(a) {
            w.money = Math.max(0, Math.min(16e3, a)), EventDispatcher.getInstance().fire("playerUpdated", w, new PlayerArgs(w))
        }, b.prototype.getMoney = function() {
            return w.money
        }, b.prototype.setWeapon = function(a) {
            w.weapon = a
        }, b.prototype.getWeapon = function() {
            return w.weapon
        }, b.prototype.setKills = function(a) {
            w.kills = a, EventDispatcher.getInstance().fire("playerUpdated", w, new PlayerArgs(w))
        }, b.prototype.getKills = function() {
            return w.kills
        }, b.prototype.setDeaths = function(a) {
            w.deaths = a, EventDispatcher.getInstance().fire("playerUpdated", w, new PlayerArgs(w))
        }, b.prototype.getDeaths = function() {
            return w.deaths
        }, b.prototype.setReloading = function(a) {
            w.reloading = a
        }, b.prototype.isReloading = function() {
            return w.reloading
        }, b.prototype.setDefuseKit = function(a) {
            w.defuseKit = a
        }, b.prototype.hasDefuseKit = function() {
            return w.defuseKit
        }, b.prototype.setBomb = function(a) {
            w.bomb = a
        }, b.prototype.hasBomb = function() {
            return w.bomb
        }, b.prototype.setHelmet = function(a) {
            w.helmet = a
        }, b.prototype.hasHelmet = function() {
            return w.helmet
        }, b.prototype.setVest = function(a) {
            w.vest = a
        }, b.prototype.hasVest = function() {
            return w.vest
        }, b.prototype.setHE = function(a) {
            w.he = a
        }, b.prototype.hasHE = function() {
            return w.he
        }, b.prototype.setVisible = function(b) {
            a.prototype.setVisible.call(w, b), w.getNoHide() && a.prototype.setVisible.call(w, !0)
        }, b.prototype.setNoHide = function(a) {
            w.noHide = a, w.setVisible(a || w.isVisible())
        }, b.prototype.getNoHide = function() {
            return w.noHide
        }, b.prototype.setFiring = function(a) {
            w.firing = a
        }, b.prototype.isFiring = function() {
            return w.firing
        }, b.prototype.setFireDelta = function(a) {
            w.fireDelta = a, w.fireDelta > b.AFTER_FIRE_DELAY && w.setFiring(!1)
        }, b.prototype.increaseFireDelta = function(a) {
            w.fireDelta += a, w.fireDelta > b.AFTER_FIRE_DELAY && w.setFiring(!1)
        }, b.prototype.getFireDelta = function() {
            return w.fireDelta
        }, b.prototype.setBombTargetTime = function(a) {
            w.bombTargetTime = a, w.bombAction = !0
        }, b.prototype.getBombTargetTime = function() {
            return w.bombTargetTime
        }, b.prototype.setDead = function(a) {
            w.dead = a
        }, b.prototype.isDead = function() {
            return w.dead
        }, b.prototype.setDeathDelta = function(a) {
            w.deathDelta = a
        }, b.prototype.increaseDeathDelta = function(a) {
            w.deathDelta += a - 10
        }, b.prototype.getDeathDelta = function() {
            return w.deathDelta
        }, b.PLAYER_RADIUS = 5, b.FOV_RADIUS = 45, b.NO_TEAM = 0, b.TERRORIST = 1, b.COUNTER_TERRORIST = 2, b.FOV_COLOR_DARK = "140, 190, 140", b.FOV_COLOR = "200, 250, 200", b.TEAM_COLORS = ["69, 69, 69", "255, 63, 0", "75, 148, 221"], b.AFTER_FIRE_DELAY = 500, b.AFTER_DEATH_DELAY = 2e3, b
    }(Entity),
    Clan = function() {
        function a(a) {
            w.name = a
        }
        return a.prototype.setName = function(a) {
            w.name = a
        }, a.prototype.getName = function() {
            return w.name
        }, a.prototype.setTag = function(a) {
            w.tag = a
        }, a.prototype.getTag = function() {
            return w.tag
        }, a.prototype.setTagPos = function(a) {
            a >= 0 && 1 >= a && (w.tagPos = a)
        }, a.prototype.getTagPos = function() {
            return w.tagPos
        }, a.prototype.setTeam = function(a) {
            if (a > 0 && 3 > a) {
                w.team = a;
                for (var b = 0; b < w.players.length; b++) w.players[b].setTeam(a)
            }
        }, a.prototype.getTeam = function() {
            return w.team
        }, a.prototype.setScore = function(a) {
            w.score > 0 && (w.score = a)
        }, a.prototype.getScore = function() {
            return w.score
        }, a.prototype.setPlayers = function(a) {
            if (5 != a.length) throw "Players list must be 5 elements long. " + a.length + " given.";
            w.players = a
        }, a.prototype.getPlayers = function() {
            return w.players
        }, a.prototype.getPlayer = function(a) {
            return w.players[a]
        }, a.LEFT = 1, a.RIGHT = 2, a.TEAM_T = 1, a.TEAM_CT = 2, a.TAG_BEFORE = 0, a.TAG_AFTER = 1, a
    }(),
    KillEventArgs = function(a) {
        function b(b, c, d, e) {
            "undefined" == typeof e && (e = !1), a.call(w), w.killer = b, w.victim = c, w.weaponName = d, w.headshot = e
        }
        return __extends(b, a), b.prototype.setKiller = function(a) {
            w.killer = a
        }, b.prototype.getKiller = function() {
            return w.killer
        }, b.prototype.setVictim = function(a) {
            w.victim = a
        }, b.prototype.getVictim = function() {
            return w.victim
        }, b.prototype.setWeaponName = function(a) {
            w.weaponName = a
        }, b.prototype.getWeaponName = function() {
            return w.weaponName
        }, b.prototype.setHeadshot = function(a) {
            w.headshot = a
        }, b.prototype.isHeadshot = function() {
            return w.headshot
        }, b
    }(EventArgs),
    DroppedWeapon = function(a) {
        function b(b) {
            a.call(w), w.setLocation(b)
        }
        return __extends(b, a), b.prototype.draw = function(a) {
            var c = 1;
            w.getLocation().isUnder() && (c *= .33), a.save(), a.beginPath(), a.rect(w.getLocation().x - b.WIDTH / 2, w.getLocation().y - b.HEIGHT / 2, b.WIDTH, b.HEIGHT), a.closePath(), a.strokeStyle = "rgba(0, 0, 0, " + c + ")", a.stroke(), a.fillStyle = "rgba(204, 204, 204, " + c + ")", a.fill(), a.restore()
        }, b.WIDTH = 5, b.HEIGHT = 3, b
    }(Entity),
    DroppedDefuseKit = function(a) {
        function b(b) {
            a.call(w), w.setLocation(b)
        }
        return __extends(b, a), b.prototype.draw = function(a) {
            var c = 1;
            w.getLocation().isUnder() && (c *= .33), a.save(), a.beginPath(), a.rect(w.getLocation().x - b.WIDTH / 2, w.getLocation().y - b.HEIGHT / 2, b.WIDTH, b.HEIGHT), a.closePath(), a.strokeStyle = "rgba(0, 0, 0, " + c + ")", a.stroke(), a.fillStyle = "rgba(0, 204, 0, " + c + ")", a.fill(), a.restore()
        }, b.WIDTH = 5, b.HEIGHT = 3, b
    }(Entity),
    GrenadeHE = function(a) {
        function b(b, c) {
            a.call(w), w.setLocation(b), w.setTarget(c), w.image = AssetHolder.getInstance().getAsset("/live/images/entity/he.png"), w.timerDelta = 0, w.moveX = (c.x - b.x) / 50, w.moveY = (c.y - b.y) / 50, w.setVisible(!0)
        }
        return __extends(b, a), b.prototype.draw = function(a) {
            w.isVisible() && a.drawImage(w.image, w.getLocation().x, w.getLocation().y)
        }, b.prototype.setTarget = function(a) {
            w.target = a
        }, b.prototype.getTarget = function() {
            return w.target
        }, b.prototype.setTimerDelta = function(a) {
            w.timerDelta = a
        }, b.prototype.increaseTimerDelta = function(a) {
            w.timerDelta += a
        }, b.prototype.getTimerDelta = function() {
            return w.timerDelta
        }, b.prototype.getMoveX = function() {
            return w.moveX
        }, b.prototype.getMoveY = function() {
            return w.moveY
        }, b.TIMER = 750, b
    }(Entity),
    TwoDLiveState = function(a) {
        function b() {
            a.apply(w, arguments)
        }
        return __extends(b, a), b.prototype.init = function(a, c) {
            var d = w;
            w.timeDelta = 0, w.speed = b.REPLAY_SPEED_NORMAL, w.paused = !1, w.showScoreboard = !1, w.switchTeams = !1, w.timer = 0, w.timerActive = !1, w.playbackPaused = !1, w.matchMessageTimer = 0, w.controlsBound = !1, a.getEventDispatcher().bind("roundStart", function(a, b) {
                d.onRoundStart(a, b)
            }), a.getEventDispatcher().bind("roundEnded", function(a, b) {
                d.onRoundEnded(a, b)
            }), a.getEventDispatcher().bind("bombPlanted", function(a, b) {
                d.onBombPlanted(a, b)
            }), a.getEventDispatcher().bind("playerBombPlant", function(a, b) {
                d.onPlayerBombPlant(a, b)
            }), a.getEventDispatcher().bind("playerBombDefuse", function(a, b) {
                d.onPlayerBombDefuse(a, b)
            }), a.getEventDispatcher().bind("roundTimerStart", function(a, b) {
                d.setTimerActive(!0)
            }), a.getEventDispatcher().bind("roundTimerStop", function(a, b) {
                d.setTimerActive(!1)
            }), a.getEventDispatcher().bind("matchMessageShow", function(a, b) {
                d.matchMessageTimer = 0, d.matchMessageActive = !0
            }), a.getEventDispatcher().bind("gameHalfTime", function(a, b) {
                d.onGameHalfTime(a, b)
            }), a.getEventDispatcher().bind("gameHalfTimeEnded", function(a, b) {
                d.onGameHalfTimeEnded()
            }), a.getEventDispatcher().bind("gameFullTime", function(a, b) {
                d.onGameFullTime(a, b)
            }), a.getEventDispatcher().bind("gameFullTimeEnded", function(a, b) {
                d.onGameFullTimeEnded()
            })
        }, b.prototype.enter = function(a, c) {
            var d = w,
                c = c;
            !w.controlsBound && $("#controls").length > 0 && ($("#control-playback-speed-slow").bind("click", function() {
                d.setSpeed(b.REPLAY_SPEED_SLOW), d.updateSpeedButtons("slow")
            }), $("#control-playback-speed-normal").bind("click", function() {
                d.setSpeed(b.REPLAY_SPEED_NORMAL), d.updateSpeedButtons("normal")
            }), $("#control-playback-speed-fast").bind("click", function() {
                d.setSpeed(b.REPLAY_SPEED_FAST), d.updateSpeedButtons("fast")
            }), $("#control-playback-round-pause-play").bind("click", function() {
                d.playbackPaused ? (d.playbackPaused = !1, d.setTimerActive(!0), $("#control-playback-round-pause-play").find("span").removeClass("glyphicon-play").addClass("glyphicon-pause")) : (d.playbackPaused = !0, d.setTimerActive(!1), $("#control-playback-round-pause-play").find("span").removeClass("glyphicon-pause").addClass("glyphicon-play"))
            }), $("#control-playback-round-previous").bind("click", function() {
                c.getDataReader().previousRound()
            }), $("#control-playback-round-next").bind("click", function() {
                c.getDataReader().nextRound()
            }), w.controlsBound = !0), $(a.getContext().canvas).css("background-image", "url(" + c.getMap().image + ")")
        }, b.prototype.update = function(a, b, c) {
            if (w.playbackPaused || (w.timeDelta += c), w.matchMessageActive && (w.matchMessageTimer += c, w.matchMessageTimer > 1e3 && (w.matchMessageActive = !1, a.getEventDispatcher().fire("matchMessageHide", w, new EventArgs()))), !w.playbackPaused && w.timeDelta > 50 * w.speed && (w.timer <= 105e3 && b.getDataReader().readRoundFrame(), w.timeDelta -= 50 * w.speed), w.paused || w.showScoreboard ? $("#scoreboardLayer").show() : $("#scoreboardLayer").hide(), !w.playbackPaused && w.isTimerActive() && w.timer > 0) {
                w.timer -= 2 * c * (1 / w.speed);
                var d, e, f, g;
                w.timer > 105e3 ? (d = Math.floor((w.timer - 105e3) / 1e3 / 60), e = Math.floor((w.timer - 105e3) / 1e3 - 60 * d)) : (d = Math.floor(w.timer / 1e3 / 60), e = Math.floor(w.timer / 1e3 - 60 * d)), f = 10 > d ? "0" + d : "" + d, g = 10 > e ? "0" + e : "" + e, $("#round-timer").html(f + ":" + g), $("#killHistory").find("li").each(function() {
                    var a = (new Date()).getTime() - 3e3;
                    parseInt($(w).attr("data-date")) < a && $(w).remove()
                })
            }
            if (!w.isPaused() && !w.playbackPaused) {
                for (var h = 0; 5 > h; h++) {
                    var i = b.getHomeClan().getPlayer(h),
                        j = b.getAwayClan().getPlayer(h);
                    i.update(c), j.update(c), b.isFowForced() || b.isFowActivated() ? (i.isDead() ? i.setVisible(!0) : (i.setVisible(b.getFowClan() == TwoDGame.FOW_HOME_CLAN), i.setNoHide(!b.isFowForced() || b.getFowClan() == TwoDGame.FOW_HOME_CLAN)), j.isDead() ? j.setVisible(!0) : (j.setVisible(b.getFowClan() == TwoDGame.FOW_AWAY_CLAN), j.setNoHide(!b.isFowForced() || b.getFowClan() == TwoDGame.FOW_AWAY_CLAN))) : (i.setVisible(!0), j.setVisible(!0)), i.increaseFireDelta(c), j.increaseFireDelta(c), i.isDead() && i.getDeathDelta() < Player.AFTER_DEATH_DELAY && i.increaseDeathDelta(c), j.isDead() && j.getDeathDelta() < Player.AFTER_DEATH_DELAY && j.increaseDeathDelta(c)
                }
                for (var h = 0; h < b.getGrenades().length; h++) {
                    var k = b.getGrenades()[h];
                    if (k.increaseTimerDelta(c), k.getTimerDelta() < GrenadeHE.TIMER) {
                        var l = k.getLocation().x + k.getMoveX(),
                            m = k.getLocation().y + k.getMoveY();
                        k.setLocation(new MapPoint(l, m, !1))
                    } else k.setVisible(!1), b.removeGrenade(h)
                }
            }
        }, b.prototype.render = function(a, b) {
            (b.getBomb().isDropped() || b.getBomb().isPlanted()) && b.getBomb().draw(a.getContext());
            for (var c = 0; c < b.getDroppedWeapons().length; c++) b.getDroppedWeapons()[c].draw(a.getContext());
            for (var c = 0; c < b.getDroppedDefuseKits().length; c++) b.getDroppedDefuseKits()[c].draw(a.getContext());
            for (var c = 0; 5 > c; c++) b.getHomeClan().getPlayer(c).draw(a.getContext()), b.getAwayClan().getPlayer(c).draw(a.getContext());
            for (var c = 0; c < b.getGrenades().length; c++) b.getGrenades()[c].draw(a.getContext())
        }, b.prototype.setPaused = function(a) {
            w.paused = a
        }, b.prototype.isPaused = function() {
            return w.paused
        }, b.prototype.setSpeed = function(a) {
            w.speed = a
        }, b.prototype.getSpeed = function() {
            return w.speed
        }, b.prototype.updateSpeedButtons = function(a) {
            $("#control-playback-speed").find(".btn").removeClass("btn-primary").addClass("btn-default"), $("#control-playback-speed-" + a).addClass("btn-primary")
        }, b.prototype.setTimer = function(a) {
            w.timer = 1e3 * a
        }, b.prototype.setTimerActive = function(a) {
            w.timerActive = a
        }, b.prototype.isTimerActive = function() {
            return w.timerActive
        }, b.prototype.onRoundStart = function(a, b) {
            w.setTimer(107), w.setTimerActive(!0), $("div.container").removeClass("bomb-planted")
        }, b.prototype.onRoundEnded = function(a, b) {
            w.setTimerActive(!1)
        }, b.prototype.onBombPlanted = function(a, b) {
            w.setTimer(35), $("div.container").addClass("bomb-planted")
        }, b.prototype.onPlayerBombPlant = function(a, b) {
            console.log("Bomb planting, target time: " + 500 * DataReader2D_8.BOMB_PLANT_TIME * w.speed), b.getPlayer().setBombTargetTime(500 * DataReader2D_8.BOMB_PLANT_TIME * w.speed)
        }, b.prototype.onPlayerBombDefuse = function(a, b) {
            console.log("Bomb defusing, target time: " + 500 * (b.getPlayer().hasDefuseKit() ? DataReader2D_8.BOMB_DEFUSE_KIT_TIME : DataReader2D_8.BOMB_DEFUSE_TIME) * w.speed), b.getPlayer().setBombTargetTime(500 * (b.getPlayer().hasDefuseKit() ? DataReader2D_8.BOMB_DEFUSE_KIT_TIME : DataReader2D_8.BOMB_DEFUSE_TIME) * w.speed)
        }, b.prototype.onGameHalfTime = function(a, b) {
            w.setTimer(60), w.setPaused(!0)
        }, b.prototype.onGameHalfTimeEnded = function() {
            w.setPaused(!1)
        }, b.prototype.onGameFullTime = function(a, b) {
            w.setTimer(60), w.setPaused(!0)
        }, b.prototype.onGameFullTimeEnded = function() {
            w.setPaused(!1)
        }, b.REPLAY_SPEED_SLOW = 2, b.REPLAY_SPEED_NORMAL = 1, b.REPLAY_SPEED_FAST = .5, b
    }(GameState),
    TwoDGameOverState = function(a) {
        function b() {
            a.apply(w, arguments)
        }
        return __extends(b, a), b.prototype.init = function(a, b) {
            var c = w;
            a.getEventDispatcher().bind("controlsLoaded", function(a, b) {
                c.onControlsLoaded(a, b)
            })
        }, b.prototype.enter = function(a, b) {
            var c = w;
            b.setMessage("Game has ended!", ""), a.getEventDispatcher().fire("matchMessageShow", w, new EventArgs()), w.controls = $("#controls"), 0 == w.controls.size() ? $.get("/live/2d/controls", function(b) {
                console.log(b), $("div.container").prepend(b), c.controls = $("#controls"), a.getEventDispatcher().fire("controlsLoaded", c, new EventArgs())
            }) : a.getEventDispatcher().fire("controlsLoaded", w, new EventArgs())
        }, b.prototype.render = function(a, b, c) {}, b.prototype.leave = function(a, b) {
            w.controls.find(".btn").removeClass("disabled"), w.controls.find(".replay").hide().addClass("disabled"), a.getEventDispatcher().fire("replayRestarted", w, new EventArgs())
        }, b.prototype.onControlsLoaded = function(a, b) {
            w.controls.find(".btn").addClass("disabled"), w.controls.find(".replay").show().removeClass("disabled")
        }, b
    }(GameState),
    WeaponChangedArgs = function(a) {
        function b(b, c, d) {
            a.call(w), w.player = b, w.oldWeapon = c, w.newWeapon = d
        }
        return __extends(b, a), b.prototype.setPlayer = function(a) {
            w.player = a
        }, b.prototype.getPlayer = function() {
            return w.player
        }, b.prototype.setOldWeapon = function(a) {
            w.oldWeapon = a
        }, b.prototype.getOldWeapon = function() {
            return w.oldWeapon
        }, b.prototype.setNewWeapon = function(a) {
            w.newWeapon = a
        }, b.prototype.getNewWeapon = function() {
            return w.newWeapon
        }, b
    }(EventArgs),
    DataReader2D_9 = function() {
        function a(a) {
            w.data = a,
            w.rounds = w.currentRound = 0,
            w.roundFramePositions = [],
            w.roundFrameMetaSize = [],
            w.roundHomeClanTeam = [],
            w.halfTime = !1,
            w.fullTime = !1
        }
        return a.prototype.readMatchData = function() {
            console.log("Reading match meta info...");
            var b = new Clan(w.data.readString(!0)),
                c = new Clan(w.data.readString(!0));
            b.setTag(w.data.readString(!0)), c.setTag(w.data.readString(!0)), b.setTagPos(w.data.getUint8(void 0)), c.setTagPos(w.data.getUint8(void 0));
            for (var d = [], e = [], f = 0; 5 > f; f++) d[f] = new Player(w.data.readString(!0)), e[f] = new Player(w.data.readString(!0));
            b.setPlayers(d), c.setPlayers(e), b.setTeam(Clan.TEAM_T), c.setTeam(Clan.TEAM_CT), w.game.setHomeClan(b), w.game.setAwayClan(c), w.rounds = w.data.getUint8(void 0), w.overtimes = (w.rounds - 2 * a.MAX_ROUNDS + 2) / (2 * a.OVERTIME_MAX_ROUNDS + 2), console.log(b.getName() + " vs. " + c.getName() + ", " + w.rounds + " rounds."), w.game.window.eventDispatcher.fire("matchDataLoaded", w, new EventArgs()), w.readRoundStart()
        }, a.prototype.readRoundStart = function() {
            if (w.currentRound >= w.rounds) return void w.game.window.eventDispatcher.fire("gameEnded", w, new EventArgs());
            w.game.window.eventDispatcher.fire("roundStart", w, new EventArgs()), w.currentRound++, w.halfTime || !w.isHalfTime() && !w.isOvertimeHalfTime() ? w.fullTime || !w.isFullTime() && !w.isOvertimeFullTime() ? (w.fullTime && w.game.window.eventDispatcher.fire("gameFullTimeEnded", w, new EventArgs()), (w.halfTime || w.fullTime) && (w.switchTeams(), w.halfTime ? w.game.window.eventDispatcher.fire("gameHalfTimeEnded", w, new EventArgs()) : w.fullTime && w.game.window.eventDispatcher.fire("gameFullTimeEnded", w, new EventArgs())), w.roundHomeClanTeam[w.currentRound] ? w.roundHomeClanTeam[w.currentRound] != w.game.getHomeClan().getTeam() && w.switchTeams() : w.roundHomeClanTeam[w.currentRound] = w.game.getHomeClan().getTeam(), w.halfTime = !1, w.fullTime = !1) : (w.game.window.eventDispatcher.fire("gameFullTime", w, new EventArgs()), w.fullTime = !0) : (w.game.window.eventDispatcher.fire("gameHalfTime", w, new EventArgs()), w.halfTime = !0), console.log("Starting round " + w.currentRound + "/" + w.rounds), w.roundFramePositions[w.currentRound] || (w.roundFramePositions[w.currentRound] = w.data.tell()), w.frameCount = w.data.readShort(), w.frameSize = w.data.readShort(), w.currentFrame = 0, w.game.setGameTime(w.data.readShort()), w.game.setScoreHome(w.data.getUint8(void 0)), w.game.setScoreAway(w.data.getUint8(void 0)), w.game.window.eventDispatcher.fire("scoreUpdated", w, new EventArgs()), w.homeTacticType = w.data.getUint8(void 0), w.awayTacticType = w.data.getUint8(void 0), w.homeTacticName = w.data.readString(!0), w.awayTacticName = w.data.readString(!0), EventDispatcher.getInstance().fire("tacticsUpdated", w, new EventArgs());
            for (var a = 0; 5 > a; a++) w.readPlayerData(w.game.getHomeClan().getPlayer(a)), w.readPlayerData(w.game.getAwayClan().getPlayer(a));
            w.roundFrameMetaSize[w.currentRound] || (w.roundFrameMetaSize[w.currentRound] = w.data.tell() - w.roundFramePositions[w.currentRound]), w.game.window.eventDispatcher.fire("roundStarted", w, new EventArgs())
        }, a.prototype.readPlayerData = function(b) {
            b.setHealth(100), b.setVisible(!0), b.setLocation(w.game.getMap().points[w.data.readShort()]), b.setMoney(w.data.readShort()), b.setAngle(w.data.readShort()), w.updatePlayerWeapon(b, w.data.getUint8(void 0), w.data.getUint8(void 0), w.data.getUint8(void 0)), b.setKills(w.data.getUint8(void 0)), b.setDeaths(w.data.getUint8(void 0));
            var c = w.data.getUint8(void 0);
            b.setReloading((c & a.PLAYER_RELOAD) > 0), b.setDefuseKit((c & a.PLAYER_DEFUSE) > 0), b.setBomb((c & a.PLAYER_BOMB) > 0), b.setHelmet((c & a.PLAYER_HELMET) > 0), b.setVest((c & a.PLAYER_VEST) > 0), b.setHE((c & a.PLAYER_HE) > 0), w.game.window.eventDispatcher.fire("playerUpdated", w, new PlayerArgs(b))
        }, a.prototype.updatePlayerWeapon = function(b, c, d, e) {
            var f;
            if ((f = b.getWeapon()) && f.getId() == c) f.setAmmo(d), f.setBackup(e);
            else {
                var g = new Weapon(c, a.getWeaponName(c), d, e);
                w.changePlayerWeapon(b, f, g)
            }
        }, a.prototype.changePlayerWeapon = function(a, b, c) {
            a.setWeapon(c), w.game.window.eventDispatcher.fire("playerWeaponChanged", w, new WeaponChangedArgs(a, b, c)), w.game.window.eventDispatcher.fire("playerUpdated", w, new PlayerArgs(a))
        }, a.prototype.readRoundFrame = function() {
            if (w.currentFrame >= w.frameCount && w.currentRound < w.rounds ? (w.halfTime && w.game.window.eventDispatcher.fire("gameHalfTimeEnded", w, new EventArgs()), w.readRoundStart()) : w.currentRound >= w.rounds && w.game.window.eventDispatcher.fire("gameEnded", w, new EventArgs()), w.frameSize > 0) {
                w.readGameActions();
                for (var a = 0; 5 > a; a++) {
                    var b = w.game.getHomeClan().getPlayer(a),
                        c = w.game.getAwayClan().getPlayer(a);
                    w.readPlayerActions(b), w.readPlayerActions(c), b.setNoHide(!w.game.isFowActivated() || w.game.getFowClan() == TwoDGame.FOW_HOME_CLAN), b.setVisible(w.game.getFowClan() == TwoDGame.FOW_HOME_CLAN), c.setNoHide(!w.game.isFowActivated() || w.game.getFowClan() == TwoDGame.FOW_AWAY_CLAN), c.setVisible(w.game.getFowClan() == TwoDGame.FOW_AWAY_CLAN)
                }
            }
            w.currentFrame++
        }, a.prototype.readGameActions = function() {
            var b;
            for ($("#matchMessage"); 0 != (b = w.data.getInt8(void 0));) switch (b) {
                case a.ACTION_MOVE:
                    w.data.readShort();
                    break;
                case a.ACTION_PLANTED:
                    console.log("ACTION_PLANTED"), w.game.setMessage("The bomb has been planted", ""), w.game.window.eventDispatcher.fire("matchMessageShow", w, new EventArgs()), w.game.window.eventDispatcher.fire("bombPlanted", w, new EventArgs());
                    break;
                case a.ACTION_DEFUSED:
                    console.log("ACTION_DEFUSED"), w.game.setMessage("Counter-terrorists win", "The bomb has been defused"), w.game.window.eventDispatcher.fire("matchMessageShow", w, new EventArgs()), w.game.window.eventDispatcher.fire("roundEnded", w, new EventArgs()), w.game.increaseCtClanScore();
                    break;
                case a.ACTION_BOMBED:
                    console.log("ACTION_BOMBED"), w.game.setMessage("Terrorists win", "The target has been bombed"), w.game.window.eventDispatcher.fire("matchMessageShow", w, new EventArgs()), w.game.window.eventDispatcher.fire("roundEnded", w, new EventArgs()), w.game.increaseTClanScore();
                    break;
                case a.ACTION_CT_WIN:
                    console.log("ACTION_CT_WIN"), w.game.setMessage("Counter-terrorists win", ""), w.game.window.eventDispatcher.fire("matchMessageShow", w, new EventArgs()), w.game.window.eventDispatcher.fire("roundEnded", w, new EventArgs()), w.game.increaseCtClanScore();
                    break;
                case a.ACTION_T_WIN:
                    console.log("ACTION_T_WIN"), w.game.setMessage("Terrorists win", ""), w.game.window.eventDispatcher.fire("matchMessageShow", w, new EventArgs()), w.game.window.eventDispatcher.fire("roundEnded", w, new EventArgs()), w.game.increaseTClanScore();
                    break;
                case a.ACTION_KILL:
                    console.log("ACTION_KILL");
                    var c = w.data.getInt8(void 0),
                        d = w.data.getInt8(void 0),
                        e = w.data.getInt8(void 0),
                        f = c > 20 ? w.game.getCtClan().getPlayer(c - 21) : w.game.getTClan().getPlayer(c - 11),
                        g = d > 20 ? w.game.getCtClan().getPlayer(d - 21) : w.game.getTClan().getPlayer(d - 11);
                    f.setKills(f.getKills() + 1), g.setDeaths(g.getDeaths() + 1), EventDispatcher.getInstance().fire("playerKill", w, new KillEventArgs(f, g, a.getWeaponName(e)));
                    break;
                case a.ACTION_KILL_HE:
                    console.log("ACTION_KILL_HE");
                    var c = w.data.getInt8(void 0),
                        d = w.data.getInt8(void 0),
                        e = w.data.getInt8(void 0),
                        f = c > 20 ? w.game.getCtClan().getPlayer(c - 21) : w.game.getTClan().getPlayer(c - 11),
                        g = d > 20 ? w.game.getCtClan().getPlayer(d - 21) : w.game.getTClan().getPlayer(d - 11);
                    f.setKills(f.getKills() + 1), g.setDeaths(g.getDeaths() + 1), EventDispatcher.getInstance().fire("playerKill", w, new KillEventArgs(f, g, a.getWeaponName(e)));
                    break;
                case a.ACTION_HS:
                    console.log("ACTION_HS");
                    var c = w.data.getInt8(void 0),
                        d = w.data.getInt8(void 0),
                        e = w.data.getInt8(void 0),
                        f = c > 20 ? w.game.getCtClan().getPlayer(c - 21) : w.game.getTClan().getPlayer(c - 11),
                        g = d > 20 ? w.game.getCtClan().getPlayer(d - 21) : w.game.getTClan().getPlayer(d - 11);
                    f.setKills(f.getKills() + 1), g.setDeaths(g.getDeaths() + 1), EventDispatcher.getInstance().fire("playerKill", w, new KillEventArgs(f, g, a.getWeaponName(e), !0));
                    break;
                default:
                    console.error("Unknown action: " + b)
            }
        }, a.prototype.readPlayerActions = function(b) {
            for (var c, d; 0 != (c = w.data.getInt8(void 0));) switch (c) {
                case a.ACTION_MOVE:
                    b.setLocation(w.game.getMap().points[w.data.readShort()]);
                    break;
                case a.ACTION_ANGLE:
                    b.setAngle(w.data.readShort());
                    break;
                case a.ACTION_MONEY:
                    b.setMoney(w.data.readShort());
                    break;
                case a.ACTION_HEALTH:
                    b.setHealth(w.data.getInt8(void 0));
                    break;
                case a.ACTION_FIRE:
                    b.setFiring(!0), b.setFireDelta(0), b.getWeapon().setAmmo(w.data.getInt8(void 0)), w.game.window.eventDispatcher.fire("playerUpdated", w, new PlayerArgs(b));
                    break;
                case a.ACTION_HE:
                    console.log("ACTION_HE"), d = new MapPoint(3 * w.data.readShort() + w.game.getMap().getX(), 3 * w.data.readShort() + w.game.getMap().getY(), !1), w.game.addGrenade(new GrenadeHE(b.getLocation(), d)), b.setHE(!1), w.game.window.eventDispatcher.fire("playerUpdated", w, new PlayerArgs(b));
                    break;
                case a.ACTION_RELOAD:
                    b.getWeapon().setAmmo(w.data.getInt8(void 0)), b.getWeapon().setBackup(w.data.getInt8(void 0));
                    break;
                case a.ACTION_PLANT:
                    w.game.getBomb().setLocation(b.getLocation()), EventDispatcher.getInstance().fire("playerBombPlant", w, new PlayerArgs(b));
                    break;
                case a.ACTION_DEFUSE:
                    EventDispatcher.getInstance().fire("playerBombDefuse", w, new PlayerArgs(b));
                    break;
                case a.ACTION_DROP:
                    d = w.game.getMap().points[w.data.readShort()], w.game.addDroppedWeapon(new DroppedWeapon(d));
                    break;
                case a.ACTION_CHANGE_WEAPON:
                    var e = w.data.getInt8(void 0),
                        f = w.data.getInt8(void 0),
                        g = w.data.getInt8(void 0),
                        h = new Weapon(e, a.getWeaponName(e), f, g);
                    w.changePlayerWeapon(b, b.getWeapon(), h);
                    break;
                case a.ACTION_PICKUP:
                    var e = w.data.getInt8(void 0),
                        f = w.data.getInt8(void 0),
                        g = w.data.getInt8(void 0),
                        h = new Weapon(e, a.getWeaponName(e), f, g);
                    w.changePlayerWeapon(b, b.getWeapon(), h);
                    for (var i = w.game.getDroppedWeapons(), j = 0; j <= i.length; j++)
                        if (i[j].getLocation().x == b.getLocation().x && i[j].getLocation().y == b.getLocation().y) {
                            w.game.removeDroppedWeapon(j);
                            break
                        } break;
                case a.ACTION_DROP_BOMB:
                    d = w.game.getMap().points[w.data.readShort()], w.game.getBomb().setLocation(d), w.game.getBomb().setDropped(!0);
                    break;
                case a.ACTION_PICKUP_BOMB:
                    w.game.getBomb().setDropped(!1);
                    break;
                case a.ACTION_DROP_DEFUSEKIT:
                    d = w.game.getMap().points[w.data.readShort()], w.game.addDroppedDefuseKit(new DroppedDefuseKit(d));
                    break;
                case a.ACTION_PICKUP_DEFUSEKIT:
                    for (var k = w.game.getDroppedDefuseKits(), j = 0; j <= k.length; j++)
                        if (k[j].getLocation().x == b.getLocation().x && k[j].getLocation().y == b.getLocation().y) {
                            w.game.removeDroppedWeapon(j);
                            break
                        } b.setDefuseKit(!0);
                    break;
                case a.ACTION_SHOW:
                    b.setVisible(!0);
                    break;
                case a.ACTION_HIDE:
                    b.setVisible(!1);
                    break;
                default:
                    console.error("Unknown action: " + c)
            }
        }, a.getWeaponName = function(b) {
            return a.WEAPON_NAMES[b]
        }, a.prototype.setGame = function(a) {
            w.game = a
        }, a.prototype.getGame = function() {
            return w.game
        }, a.prototype.getData = function() {
            return w.data
        }, a.prototype.getHomeTacticName = function() {
            return w.homeTacticName
        }, a.prototype.getAwayTacticName = function() {
            return w.awayTacticName
        }, a.prototype.getHomeTacticType = function() {
            return w.homeTacticType
        }, a.prototype.getAwayTacticType = function() {
            return w.awayTacticType
        }, a.prototype.isHalfTime = function() {
            return w.currentRound == a.MAX_ROUNDS + 1
        }, a.prototype.isFullTime = function() {
            return w.currentRound == 2 * a.MAX_ROUNDS + 2
        }, a.prototype.isOverTime = function() {
            return w.currentRound > 2 * a.MAX_ROUNDS + 2
        }, a.prototype.isOvertimeHalfTime = function() {
            return w.isOverTime() && (w.currentRound - 2 * a.MAX_ROUNDS + 2) % a.OVERTIME_MAX_ROUNDS * 2 + 2 > 0 && (w.currentRound - 2 * a.MAX_ROUNDS + 2) % (a.OVERTIME_MAX_ROUNDS + 1) == 0
        }, a.prototype.isOvertimeFullTime = function() {
            return w.isOverTime() && (w.currentRound - 2 * a.MAX_ROUNDS + 2) % (2 * a.OVERTIME_MAX_ROUNDS + 2) == 0
        }, a.prototype.switchTeams = function() {
            w.game.getHomeClan().getTeam() == Clan.TEAM_T ? (w.game.getHomeClan().setTeam(Clan.TEAM_CT), w.game.getAwayClan().setTeam(Clan.TEAM_T)) : (w.game.getHomeClan().setTeam(Clan.TEAM_T), w.game.getAwayClan().setTeam(Clan.TEAM_CT)), w.game.window.eventDispatcher.fire("teamsSwitched", w, new EventArgs())
        }, a.prototype.getMaxRounds = function() {
            if (w.currentRound <= 2 * a.MAX_ROUNDS) return a.MAX_ROUNDS;
            var b = w.currentRound - 2 * a.MAX_ROUNDS;
            return b % (2 * a.OVERTIME_MAX_ROUNDS) == 0 ? (2 * a.MAX_ROUNDS + b) / 2 : 2 * a.MAX_ROUNDS + a.OVERTIME_MAX_ROUNDS * Math.ceil(b / a.OVERTIME_MAX_ROUNDS)
        }, a.prototype.getFrameCount = function() {
            return w.frameCount
        }, a.prototype.getFrameSize = function() {
            return w.frameSize
        }, a.prototype.getCurrentFrame = function() {
            return w.currentFrame
        }, a.prototype.nextRound = function() {
            if (!(w.currentRound >= w.rounds)) {
                var a;
                null == (a = w.roundFramePositions[w.currentRound + 1]) && (a = w.roundFramePositions[w.currentRound] + w.roundFrameMetaSize[w.currentRound] + w.getFrameSize()), w.data.seek(a), w.readRoundStart()
            }
        }, a.prototype.previousRound = function() {
            1 != w.currentRound && (w.data.seek(w.roundFramePositions[--w.currentRound]), --w.currentRound, w.readRoundStart())
        }, a.prototype.restart = function() {
            w.currentRound = 1, w.data.seek(w.roundFramePositions[w.currentRound]), w.readRoundStart()
        }, a.MAX_ROUNDS = 15, a.OVERTIME_MAX_ROUNDS = 3, a.WEAPON_NAMES = ["Grenade", "P2000", "Glock", "Deagle", "Berettas", "Five7", "P250", "Tec-9", "Nova", "XM1014", "Sawed-Off", "MAG-7", "MP7", "UMP-45", "P90", "MAC-10", "MP9", "PP-Bizon", "Galil AR", "FAMAS", "AK-47", "M4A4", "SG 553", "Aug", "SSG 08", "AWP", "G3SG1", "SCAR-20", "Negev", "M249"], a.STATIC_ROUND_BYTES = 130, a.TACTIC_STANDARD = 1, a.TACTIC_ECO = 2, a.TACTIC_PISTOL = 4, a.ACTION_MOVE = 1, a.ACTION_ANGLE = 2, a.ACTION_HEALTH = 3, a.ACTION_FIRE = 4, a.ACTION_RELOAD = 5, a.ACTION_MONEY = 6, a.ACTION_PICKUP = 7, a.ACTION_DROP = 8, a.ACTION_PLANT = 9, a.ACTION_PLANTED = 10, a.ACTION_BOMBED = 11, a.ACTION_DEFUSE = 12, a.ACTION_DEFUSED = 13, a.ACTION_CHANGE_WEAPON = 14, a.ACTION_T_WIN = 15, a.ACTION_CT_WIN = 16, a.ACTION_DROP_BOMB = 17, a.ACTION_PICKUP_BOMB = 18, a.ACTION_KILL = 19, a.ACTION_HS = 20, a.ACTION_DROP_DEFUSEKIT = 21, a.ACTION_PICKUP_DEFUSEKIT = 22, a.ACTION_KILL_HE = 23, a.ACTION_HE = 24, a.ACTION_FOW_A = 25, a.ACTION_FOW_B = 26, a.ACTION_SHOW = 27, a.ACTION_HIDE = 28, a.PLAYER_RELOAD = 1, a.PLAYER_DEFUSE = 2, a.PLAYER_BOMB = 4, a.PLAYER_HELMET = 8, a.PLAYER_VEST = 16, a.PLAYER_HE = 128, a.BOMB_PLANT_TIME = 4, a.BOMB_DEFUSE_TIME = 10, a.BOMB_DEFUSE_KIT_TIME = 5, a
    }(),
    TwoDDataReaderFactory = function() {
        function a() {}
        return a.create = function(a, b) {
            switch (console.log("File version: " + a), a) {
                case 8:
                    return new DataReader2D_8(b);
                case 9:
                    return new DataReader2D_9(b)
            }
            throw "File version " + a + " is not supported."
        }, a
    }(),
    LoadingState = function(a) {
        function b(b) {
            a.call(w, b), w.matchDataLoaded = !1, w.assetsLoaded = !1, w.assetsCountLoaded = 0, w.fowOptionsLoaded = !1
        }
        return __extends(b, a), b.prototype.init = function(a, b) {
            var c = w;
            a.getEventDispatcher().bind("readMatchData", function() {
                c.loadMatchData(a, b)
            }), a.getEventDispatcher().bind("matchDataLoaded", function() {
                c.matchDataLoaded = !0
            }), a.getEventDispatcher().bind("assetLoaded", function() {
                c.assetsCountLoaded++, c.assetsCount == c.assetsCountLoaded && (c.assetsLoaded = !0)
            }), w.timeDelta = 0
        }, b.prototype.enter = function(a, b) {
            var c = w;
            if (a.getEventDispatcher().fire("readingMatchData", w, new EventArgs()), w.matchDataLoaded || (console.log("Start reading match data..."), b.readMatchData()), !w.fowOptionsLoaded) {
                var d = "/live/2d/fow/" + b.getGameType() + "/" + b.getGameId();
                b.getDemoId() && (d += "/" + b.getDemoId()), $.get("/live/2d/fow/" + b.getGameType() + "/" + b.getGameId() + "/" + (b.getDemoId() ? b.getDemoId() : 0), function(a) {
                    b.setFowForced(a.fowForced), b.setFowClan(a.fowClan), c.fowOptionsLoaded = !0
                })
            }
            if (!w.assetsLoaded) {
                var e = a.getAssetHolder();
                try {
                    w.assetsCount = 1, e.getAsset("/live/images/entity/he.png")
                } catch (f) {
                    console.log(f)
                }
            }
        }, b.prototype.update = function(a, b, c) {
            w.timeDelta += c, w.matchDataLoaded && w.fowOptionsLoaded && w.assetsLoaded && a.getEventDispatcher().fire("loaded", w, new EventArgs())
        }, b.prototype.render = function(a, b, c) {
            c.fillStyle = "white";
            var d = c.canvas.width / 2,
                e = c.canvas.height / 2 - 10,
                f = "";
            w.timeDelta < 250 || (w.timeDelta < 500 ? f += "." : w.timeDelta < 750 ? f += ".." : w.timeDelta < 1e3 ? f += "..." : w.timeDelta = 0), c.font = "30pt Arial", c.textAlign = "center", c.fillText(f + "Loading" + f, d, e)
        }, b.prototype.loadMatchData = function(a, b) {
            var c = b;
            console.log("Loading match data...");
            var d = c.setDataReader(TwoDDataReaderFactory.create(c.getMatchData().getInt8(void 0), c.getMatchData()));
            d.readMatchData()
        }, b
    }(GameState),
    Maps;
! function(a) {
    var b = function() {
        const loadMap = (d) => {
            return d;
        }
        function a(a, b, c, d, e, f, g, h) {
            w.x = a,
            w.y = b,
            w.name = c,
            w.image = e,
            w.width = f,
            w.height = g,
            w.pointCount = h,
            w.points = [],
            w.loaded = !1,
            w.x = a,
            w.y = b,
            w.name = c,
            w.width = f,
            w.height = g,
            w.pointCount = h,
            w.image = e,
            loadMap(d)
            // w.loadMap(d)
        }
        return a.prototype.getX = function() {
            return w.x
        }, a.prototype.getY = function() {
            return w.y
        }, a.prototype.getName = function() {
            return w.name
        }, a.prototype.isLoaded = function() {
            return w.loaded
        }, a.prototype.loadMap = function(a) {
            var b = w;
            $.get(a, function(a) {
                b.readBinaryPoints(a), b.loaded = !0
            }, "dataview")
        }, a.prototype.readBinaryPoints = function(a) {
            var b;
            try {
                for (b = 1; b < w.pointCount; b++) {
                    var c, d, e, f, g;
                    f = a.getUint8(), g = a.getUint8(), c = g << 8 | f, f = a.getUint8(), g = a.getUint8(), d = g << 8 | f, e = a.getInt8(), w.points[b] = new MapPoint(3 * c + w.x, 3 * d + w.y, e > 0)
                }
            } catch (h) {
                console.log(h)
            }
        }, a
    }();
    a.Map = b
}(Maps || (Maps = {}));
var TestState = function(a) {
        function b(b) {
            a.call(w, b), w.timeDelta = 0
        }
        return __extends(b, a), b.prototype.init = function(a, b) {}, b.prototype.enter = function(a, b) {
            var c = b;
            $(a.getContext().canvas).css("background-image", "url(" + c.getMap().image + ")")
        }, b.prototype.update = function(a, b, c) {
            w.timeDelta += c
        }, b.prototype.render = function(a, b, c) {
            c.fillStyle = "black";
            var d = c.canvas.width / 2,
                e = c.canvas.height / 2 - 10;
            if (w.timeDelta < 5e3) var f = (new Date()).toLocaleTimeString();
            else if (w.timeDelta < 1e4) var f = "It must be a hardware problem";
            else w.timeDelta = 0;
            c.font = "30pt Arial", c.textAlign = "center", c.fillText(f, d, e)
        }, b
    }(GameState),
    WaitingState = function(a) {
        function b(b) {
            a.call(w, b)
        }
        return __extends(b, a), b.prototype.update = function(a, b, c) {}, b.prototype.render = function(a, b, c) {}, b
    }(GameState),
    TwoDGame = function(a) {
        function b(b, c, d) {
            a.call(w), w.gameType = b, w.gameId = c, w.demoId = d, w.matchMessageLead = "", w.matchMessageAddition = ""
        }
        return __extends(b, a), b.prototype.initStates = function() {
            const addState = (w) => {
                return w;
            }

            addState(new TestState(b.TEST_STATE)),
            addState(new WaitingState(b.WAITING_STATE)),
            addState(new LoadingState(b.LOADING_STATE)),
            addState(new TwoDLiveState(b.LIVE_STATE)),
            addState(new TwoDGameOverState(b.GAME_OVER_STATE))
        }, b.prototype.init = function() {
            var a = w;
            const enterState = (w) => {
                return;
            }

            window.eventDispatcher.bind("loaded", function() {
                a.startMatch()
            }), window.eventDispatcher.bind("homeClanChanged", function() {
                a.updateHomeClan()
            }), window.eventDispatcher.bind("awayClanChanged", function() {
                a.updateAwayClan()
            }), window.eventDispatcher.bind("scoreUpdated", function() {
                a.updateScore()
            }), window.eventDispatcher.bind("playerUpdated", function(b, c) {
                a.updateScoreboard(b, c)
            }), window.eventDispatcher.bind("playerUpdated", function(b, c) {
                a.updatePlayerInformation(b, c)
            }), window.eventDispatcher.bind("tacticsUpdated", function(b, c) {
                a.onTacticsUpdated(b, c)
            }), window.eventDispatcher.bind("playerActionShow", function(b, c) {
                var d;
                (d = a.homeClan.getPlayers().indexOf(c.getPlayer())) > -1 ? $("#home-clan-player-" + (d + 1)).removeClass("mute") : $("#away-clan-player-" + (d + 1)).removeClass("mute")
            }), window.eventDispatcher.bind("playerActionHide", function(b, c) {
                var d;
                (d = a.homeClan.getPlayers().indexOf(c.getPlayer())) > -1 ? $("#home-clan-player-" + (d + 1)).addClass("mute") : (d = a.awayClan.getPlayers().indexOf(c.getPlayer()), $("#away-clan-player-" + (d + 1)).addClass("mute"))
            }), window.eventDispatcher.bind("playerKill", function(b, c) {
                a.onPlayerKill(b, c)
            }), window.eventDispatcher.bind("playerActionDie", function(b, c) {
                var d;
                console.log(c.getPlayer().getName() + " died"), (d = a.homeClan.getPlayers().indexOf(c.getPlayer())) > -1 ? $("#home-clan-player-" + (d + 1)).addClass("dead") : (d = a.awayClan.getPlayers().indexOf(c.getPlayer()), $("#away-clan-player-" + (d + 1)).addClass("dead"))
            }), window.eventDispatcher.bind("roundStart", function() {
                for (var a = 1; 5 >= a; a++) $("#home-clan-player-" + a).removeClass("dead"), $("#away-clan-player-" + a).removeClass("dead")
            }), window.eventDispatcher.bind("roundStart", function(b, c) {
                a.onRoundStart(b, c)
            }), window.eventDispatcher.bind("matchMessageShow", function(a, b) {
                $("#matchMessage").show()
            }), window.eventDispatcher.bind("matchMessageHide", function(a, b) {
                $("#matchMessage").hide()
            }), window.eventDispatcher.bind("bombPlanted", function(b, c) {
                a.onBombPlanted(b, c)
            }), window.eventDispatcher.bind("teamsSwitched", function(b, c) {
                a.onTeamsSwitched(b, c)
            }), window.eventDispatcher.bind("gameEnded", function(b, c) {
                a.onGameEnded()
            }), window.eventDispatcher.bind("replayRestarted", function(b, c) {
                a.onReplayRestarted(b, c)

            }), enterState(b.LOADING_STATE),
            w.grenades = [], w.droppedWeapons = [],
            w.droppedDefuseKits = [],
            w.bomb = new Bomb(),
            w.fowClan = 0,
            w.fowForced = !0,
            w.fowActivated = !0
        }, b.prototype.readMatchData = function() {
            var a = w;
            "pcw" == w.gameType && 0 == w.gameId ? (console.log("Loading test match!"), $.get("test-data/game.csm", function(b) {
                a.matchData = b, a.window.eventDispatcher.fire("readMatchData", a, new EventArgs())
            }, "dataview")) : $.get("/live/2d/data/" + w.gameType + "/" + w.gameId + (w.demoId ? "/" + w.demoId : ""), function(b) {
                a.matchData = b, a.window.eventDispatcher.fire("readMatchData", a, new EventArgs())
            }, "dataview")
        }, b.prototype.startMatch = function() {
            const enterState = (w) => {
                return w;
            }
            enterState(b.LIVE_STATE)
        }, b.prototype.restartMatch = function() {
            const enterState = (w) => {
                return w;
            }
            enterState(b.LIVE_STATE)
        }, b.prototype.getMatchData = function() {
            return w.matchData
        }, b.prototype.setDataReader = function(a) {
            return w.dataReader = a, w.dataReader.getGame() != w && w.dataReader.setGame(w), w.dataReader
        }, b.prototype.getDataReader = function() {
            return w.dataReader
        }, b.prototype.setMap = function(a) {
            w.map = a
        }, b.prototype.getMap = function() {
            return w.map
        }, b.prototype.getGameType = function() {
            return w.gameType
        }, b.prototype.getGameId = function() {
            return w.gameId
        }, b.prototype.getDemoId = function() {
            return w.demoId
        }, b.prototype.setHomeClan = function(a) {
            w.homeClan = a, w.window.eventDispatcher.fire("homeClanChanged", w, new EventArgs())
        }, b.prototype.getHomeClan = function() {
            return w.homeClan
        }, b.prototype.updateHomeClan = function() {
            if ($(".home-clan-name").html(w.getHomeClan().getName()), w.getHomeClan().getPlayers())
                for (var a = 0; a < w.getHomeClan().getPlayers().length; a++) {
                    var b = w.getHomeClan().getPlayer(a),
                        c = $("#scoreboard-home-clan-player-" + (a + 1));
                    $("#players-home-clan").find(".player-" + (a + 1)).html(b.getName()), $("#home-clan-player-" + (a + 1)).attr("data-nick", b.getName()), c.attr("data-nick", b.getName()), c.find(".clan-tag").html(w.getHomeClan().getTag()), c.find(".nick-name").html(b.getName()), c.find(".money").html("$ " + b.getMoney()), c.find(".kills").html(b.getKills()), c.find(".deaths").html(b.getDeaths())
                }
        }, b.prototype.setAwayClan = function(a) {
            w.awayClan = a, w.window.eventDispatcher.fire("awayClanChanged", w, new EventArgs())
        }, b.prototype.getAwayClan = function() {
            return w.awayClan
        }, b.prototype.updateAwayClan = function() {
            if ($(".away-clan-name").html(w.getAwayClan().getName()), w.getAwayClan().getPlayers())
                for (var a = 0; a < w.getAwayClan().getPlayers().length; a++) {
                    var b = w.getAwayClan().getPlayer(a),
                        c = $("#scoreboard-away-clan-player-" + (a + 1));
                    $("#players-away-clan").find(".player-" + (a + 1)).html(b.getName()), $("#away-clan-player-" + (a + 1)).attr("data-nick", b.getName()), c.attr("data-nick", b.getName()), c.find(".clan-tag").html(w.getAwayClan().getTag()), c.find(".nick-name").html(b.getName()), c.find(".money").html("$ " + b.getMoney()), c.find(".kills").html(b.getKills()), c.find(".deaths").html(b.getDeaths())
                }
        }, b.prototype.getTClan = function() {
            return w.getHomeClan().getTeam() == Clan.TEAM_T ? w.getHomeClan() : w.getAwayClan()
        }, b.prototype.getCtClan = function() {
            return w.getHomeClan().getTeam() == Clan.TEAM_CT ? w.getHomeClan() : w.getAwayClan()
        }, b.prototype.addGrenade = function(a) {
            w.grenades.push(a)
        }, b.prototype.removeGrenade = function(a) {
            w.grenades.slice(a, 0)
        }, b.prototype.getGrenades = function() {
            return w.grenades
        }, b.prototype.addDroppedWeapon = function(a) {
            w.droppedWeapons.push(a)
        }, b.prototype.removeDroppedWeapon = function(a) {
            w.droppedWeapons.slice(a, 0)
        }, b.prototype.getDroppedWeapons = function() {
            return w.droppedWeapons
        }, b.prototype.addDroppedDefuseKit = function(a) {
            w.droppedDefuseKits.push(a)
        }, b.prototype.removeDroppedDefuseKit = function(a) {
            w.droppedDefuseKits.slice(a, 0)
        }, b.prototype.getDroppedDefuseKits = function() {
            return w.droppedDefuseKits
        }, b.prototype.getBomb = function() {
            return w.bomb
        }, b.prototype.setGameTime = function(a) {
            w.gameTime = a
        }, b.prototype.getGameTime = function() {
            return w.gameTime
        }, b.prototype.setScoreHome = function(a) {
            w.scoreHome = a, w.window.eventDispatcher.fire("homeScoreChanged", w, new EventArgs())
        }, b.prototype.getScoreHome = function() {
            return w.scoreHome
        }, b.prototype.setScoreAway = function(a) {
            w.scoreAway = a, w.window.eventDispatcher.fire("awayScoreChanged", w, new EventArgs())
        }, b.prototype.getScoreAway = function() {
            return w.scoreAway
        }, b.prototype.increaseTClanScore = function() {
            w.getTClan().setScore(w.getTClan().getScore() + 1)
        }, b.prototype.increaseCtClanScore = function() {
            w.getCtClan().setScore(w.getCtClan().getScore() + 1)
        }, b.prototype.updateScore = function() {
            $(".home-score").html(w.getScoreHome()), $(".away-score").html(w.getScoreAway())
        }, b.prototype.setMessage = function(a, b) {
            w.matchMessageLead = a, w.matchMessageAddition = b;
            var c = $("#matchMessage");
            c.find(".lead").html(a), c.find(".additional").html(b)
        }, b.prototype.onPlayerKill = function(a, b) {
            var c, d;
            w.homeClan.getPlayers().indexOf(b.getKiller()) > -1 ? (c = w.homeClan.getTeam(), d = w.awayClan.getTeam()) : (c = w.awayClan.getTeam(), d = w.homeClan.getTeam());
            var e = '<span class="';
            "HE" == b.getWeaponName() ? (e += d == Clan.TEAM_T ? 'clan-t">' : 'clan-ct">', e += b.getVictim().getName() + "</span>", e += " stepped on ", e += '<span class="', e += c == Clan.TEAM_T ? 'clan-t">' : 'clan-ct">', e += b.getKiller().getName() + "</span>", e += "'s grenade") : (e += c == Clan.TEAM_T ? 'clan-t">' : 'clan-ct">', e += b.getKiller().getName() + "</span>", e += b.isHeadshot() ? " put a bullet in " : " killed ", e += '<span class="', e += d == Clan.TEAM_T ? 'clan-t">' : 'clan-ct">', e += b.getVictim().getName() + "</span>", b.isHeadshot() && (e += "'s head"), e += " with " + b.getWeaponName()), $("#killHistory").find("ul").append('<li data-date="' + (new Date()).getTime() + '">' + e + "</li>")
        }, b.prototype.updateScoreboard = function(a, b) {
            var c;
            if ((c = w.homeClan.getPlayers().indexOf(b.getPlayer())) > -1) var d = $("#scoreboard-home-clan-player-" + (c + 1));
            else {
                c = w.awayClan.getPlayers().indexOf(b.getPlayer());
                var d = $("#scoreboard-away-clan-player-" + (c + 1))
            }
            d.find(".money").html("$ " + b.getPlayer().getMoney()), d.find(".kills").html(b.getPlayer().getKills()), d.find(".deaths").html(b.getPlayer().getDeaths())
        }, b.prototype.updatePlayerInformation = function(a, b) {
            var c;
            if ((c = w.homeClan.getPlayers().indexOf(b.getPlayer())) > -1) var d = $("#home-clan-player-" + (c + 1));
            else {
                c = w.awayClan.getPlayers().indexOf(b.getPlayer());
                var d = $("#away-clan-player-" + (c + 1))
            }
            var e = "";
            e = b.getPlayer().hasVest() ? "V/" : "-/", e += b.getPlayer().hasHelmet() ? "H" : "-";
            var f = "";
            f = b.getPlayer().hasHE() ? "HE" : "-", b.getPlayer().hasBomb() && (f += " B"), b.getPlayer().hasDefuseKit() && (f += " D"), d.find(".player-health").html("+ " + b.getPlayer().getHealth()), d.find(".player-armor").html(e), d.find(".player-items").html(f), b.getPlayer().getWeapon() && (d.find(".player-weapon").html(b.getPlayer().getWeapon().getName()), d.find(".player-ammo").html("(" + b.getPlayer().getWeapon().getAmmo() + "/" + b.getPlayer().getWeapon().getBackup() + ")"))
        }, b.prototype.onRoundStart = function(a, b) {
            w.grenades = [], w.droppedWeapons = [], w.droppedDefuseKits = [], w.bomb.setDropped(!1), w.bomb.setPlanted(!1), $("#matchMessage").hide()
        }, b.prototype.onTacticsUpdated = function(a, b) {
            if (0 == w.fowClan) return void $("#tacticName").hide();
            var c = "",
                d = 1 == w.fowClan ? w.dataReader.getHomeTacticType() : w.dataReader.getAwayTacticType(),
                e = 1 == w.fowClan ? w.dataReader.getHomeTacticName() : w.dataReader.getAwayTacticName();
            switch (d) {
                case DataReader2D_8.TACTIC_STANDARD:
                    c += "Standard tactic: ";
                    break;
                case DataReader2D_8.TACTIC_ECO:
                    c += "Eco tactic: ";
                    break;
                case DataReader2D_8.TACTIC_PISTOL:
                    c += "Pistol tactic: "
            }
            c += e, $("#tacticName").find("span").html(c).show()
        }, b.prototype.onBombPlanted = function(a, b) {
            w.bomb.setPlanted(!0)
        }, b.prototype.onTeamsSwitched = function(a, b) {
            var c = $("#scoreboardCts"),
                d = $("#scoreboardTs"),
                e = c.find("table").clone(!0),
                f = d.find("table").clone(!0);
            c.find("div.table-responsive").html("").html(f), d.find("div.table-responsive").html("").html(e);
            var g = $("#players-home-clan"),
                h = $("#players-away-clan"),
                i = $("div.match-score > div.home-clan"),
                j = $("div.match-score > div.away-clan");
            w.getHomeClan().getTeam() == Clan.TEAM_T ? (g.removeClass("information-clan-ct"),
            i.removeClass("clan-ct"),
            h.removeClass("information-clan-t"),
            j.removeClass("clan-t"),
            g.addClass("information-clan-t"),
            i.addClass("clan-t"),
            h.addClass("information-clan-ct"),
            j.addClass("clan-ct")) : (g.removeClass("information-clan-t") ,
            i.removeClass("clan-t"),
            h.removeClass("information-clan-ct"),
            j.removeClass("clan-ct"),
            g.addClass("information-clan-ct"),
            i.addClass("clan-ct"),
            h.addClass("information-clan-t"),
            j.addClass("clan-t"))
        }, b.prototype.onGameEnded = function() {
            const enterState = (w) => {
                return w;
            }
            enterState(b.GAME_OVER_STATE)
        }, b.prototype.onReplayRestarted = function(a, b) {
            w.dataReader.restart()
        }, b.prototype.setFowClan = function(a) {
            w.fowClan = a
        }, b.prototype.getFowClan = function() {
            return w.fowClan
        }, b.prototype.setFowActivated = function(a) {
            w.fowActivated = a || w.isFowForced()
        }, b.prototype.isFowActivated = function() {
            return w.fowActivated
        }, b.prototype.setFowForced = function(a) {
            w.fowForced = a
        }, b.prototype.isFowForced = function() {
            return w.fowForced
        }, b.main = function(a, c, d, e) {
            var f = new b(c, d, e),
                g = new GameContainer(a, f);
            return g.start(), f
        }, b.TEST_STATE = -1, b.WAITING_STATE = 0, b.LOADING_STATE = 1, b.LIVE_STATE = 2, b.REPLAY_STATE = 3, b.GAME_OVER_STATE = 4, b.REPLAY_OVER_STATE = 5, b.FOW_HOME_CLAN = 1, b.FOW_AWAY_CLAN = 2, b
    }(Game),
    DataReader2D_8 = function() {
        function a(a) {
            w.data = a,
            w.rounds = w.currentRound = 0,
            w.roundFramePositions = [],
            w.roundFrameMetaSize = [],
            w.roundHomeClanTeam = [],
            w.halfTime = !1,
            w.fullTime = !1
        }
        return a.prototype.readMatchData = function() {
            console.log("Reading match meta info...");
            var b = new Clan(w.data.readString(!0)),
                c = new Clan(w.data.readString(!0));
            b.setTag(w.data.readString(!0)), c.setTag(w.data.readString(!0)), b.setTagPos(w.data.getUint8(void 0)), c.setTagPos(w.data.getUint8(void 0));
            for (var d = [], e = [], f = 0; 5 > f; f++) d[f] = new Player(w.data.readString(!0)), e[f] = new Player(w.data.readString(!0));
            b.setPlayers(d), c.setPlayers(e), b.setTeam(Clan.TEAM_T), c.setTeam(Clan.TEAM_CT), w.game.setHomeClan(b), w.game.setAwayClan(c), w.rounds = w.data.getUint8(void 0), w.overtimes = (w.rounds - 2 * a.MAX_ROUNDS + 2) / (2 * a.OVERTIME_MAX_ROUNDS + 2), console.log(b.getName() + " vs. " + c.getName() + ", " + w.rounds + " rounds."), w.game.window.eventDispatcher.fire("matchDataLoaded", w, new EventArgs()), w.readRoundStart()
        }, a.prototype.readRoundStart = function() {
            if (w.currentRound >= w.rounds) return void w.game.window.eventDispatcher.fire("gameEnded", w, new EventArgs());
            w.game.window.eventDispatcher.fire("roundStart", w, new EventArgs()), w.currentRound++, w.halfTime || !w.isHalfTime() && !w.isOvertimeHalfTime() ? w.fullTime || !w.isFullTime() && !w.isOvertimeFullTime() ? (w.fullTime && w.game.window.eventDispatcher.fire("gameFullTimeEnded", w, new EventArgs()), (w.halfTime || w.fullTime) && (w.switchTeams(), w.halfTime ? w.game.window.eventDispatcher.fire("gameHalfTimeEnded", w, new EventArgs()) : w.fullTime && w.game.window.eventDispatcher.fire("gameFullTimeEnded", w, new EventArgs())), w.roundHomeClanTeam[w.currentRound] ? w.roundHomeClanTeam[w.currentRound] != w.game.getHomeClan().getTeam() && w.switchTeams() : w.roundHomeClanTeam[w.currentRound] = w.game.getHomeClan().getTeam(), w.halfTime = !1, w.fullTime = !1) : (w.game.window.eventDispatcher.fire("gameFullTime", w, new EventArgs()), w.fullTime = !0) : (w.game.window.eventDispatcher.fire("gameHalfTime", w, new EventArgs()), w.halfTime = !0), console.log("Starting round " + w.currentRound + "/" + w.rounds), w.roundFramePositions[w.currentRound] || (w.roundFramePositions[w.currentRound] = w.data.tell()), w.frameCount = w.data.readShort(), w.frameSize = w.data.readShort(), w.currentFrame = 0, w.game.setGameTime(w.data.readShort()), w.game.setScoreHome(w.data.getUint8(void 0)), w.game.setScoreAway(w.data.getUint8(void 0)), w.game.window.eventDispatcher.fire("scoreUpdated", w, new EventArgs()), w.homeTacticType = w.data.getUint8(void 0), w.awayTacticType = w.data.getUint8(void 0), w.homeTacticName = w.data.readString(!0), w.awayTacticName = w.data.readString(!0), EventDispatcher.getInstance().fire("tacticsUpdated", w, new EventArgs());
            for (var a = 0; 5 > a; a++) w.readPlayerData(w.game.getHomeClan().getPlayer(a)), w.readPlayerData(w.game.getAwayClan().getPlayer(a));
            w.roundFrameMetaSize[w.currentRound] || (w.roundFrameMetaSize[w.currentRound] = w.data.tell() - w.roundFramePositions[w.currentRound]), w.game.window.eventDispatcher.fire("roundStarted", w, new EventArgs())
        }, a.prototype.readPlayerData = function(b) {
            b.setHealth(100), b.setVisible(!0), b.setLocation(w.game.getMap().points[w.data.readShort()]), b.setMoney(w.data.readShort()), b.setAngle(w.data.readShort()), w.updatePlayerWeapon(b, w.data.getUint8(void 0), w.data.getUint8(void 0), w.data.getUint8(void 0)), b.setKills(w.data.getUint8(void 0)), b.setDeaths(w.data.getUint8(void 0));
            var c = w.data.getUint8(void 0);
            b.setReloading((c & a.PLAYER_RELOAD) > 0), b.setDefuseKit((c & a.PLAYER_DEFUSE) > 0), b.setBomb((c & a.PLAYER_BOMB) > 0), b.setHelmet((c & a.PLAYER_HELMET) > 0), b.setVest((c & a.PLAYER_VEST) > 0), b.setHE((c & a.PLAYER_HE) > 0), w.game.window.eventDispatcher.fire("playerUpdated", w, new PlayerArgs(b))
        }, a.prototype.updatePlayerWeapon = function(b, c, d, e) {
            var f;
            if ((f = b.getWeapon()) && f.getId() == c) f.setAmmo(d), f.setBackup(e);
            else {
                var g = new Weapon(c, a.getWeaponName(c), d, e);
                w.changePlayerWeapon(b, f, g)
            }
        }, a.prototype.changePlayerWeapon = function(a, b, c) {
            a.setWeapon(c), w.game.window.eventDispatcher.fire("playerWeaponChanged", w, new WeaponChangedArgs(a, b, c)), w.game.window.eventDispatcher.fire("playerUpdated", w, new PlayerArgs(a))
        }, a.prototype.readRoundFrame = function() {
            if (w.currentFrame >= w.frameCount && w.currentRound < w.rounds ? (w.halfTime && w.game.window.eventDispatcher.fire("gameHalfTimeEnded", w, new EventArgs()), w.readRoundStart()) : w.currentRound >= w.rounds && w.game.window.eventDispatcher.fire("gameEnded", w, new EventArgs()), w.frameSize > 0) {
                w.readGameActions();
                for (var a = 0; 5 > a; a++) {
                    var b = w.game.getHomeClan().getPlayer(a),
                        c = w.game.getAwayClan().getPlayer(a);
                    w.readPlayerActions(b), w.readPlayerActions(c), b.setNoHide(!w.game.isFowActivated() || w.game.getFowClan() == TwoDGame.FOW_HOME_CLAN), b.setVisible(w.game.getFowClan() == TwoDGame.FOW_HOME_CLAN), c.setNoHide(!w.game.isFowActivated() || w.game.getFowClan() == TwoDGame.FOW_AWAY_CLAN), c.setVisible(w.game.getFowClan() == TwoDGame.FOW_AWAY_CLAN)
                }
            }
            w.currentFrame++
        }, a.prototype.readGameActions = function() {
            var b;
            for ($("#matchMessage"); 0 != (b = w.data.getInt8(void 0));) switch (b) {
                case a.ACTION_PLANTED:
                    console.log("ACTION_PLANTED"), w.game.setMessage("The bomb has been planted", ""), w.game.window.eventDispatcher.fire("matchMessageShow", w, new EventArgs()), w.game.window.eventDispatcher.fire("bombPlanted", w, new EventArgs());
                    break;
                case a.ACTION_DEFUSED:
                    console.log("ACTION_DEFUSED"), w.game.setMessage("Counter-terrorists win", "The bomb has been defused"), w.game.window.eventDispatcher.fire("matchMessageShow", w, new EventArgs()), w.game.window.eventDispatcher.fire("roundEnded", w, new EventArgs()), w.game.increaseCtClanScore();
                    break;
                case a.ACTION_BOMBED:
                    console.log("ACTION_BOMBED"), w.game.setMessage("Terrorists win", "The target has been bombed"), w.game.window.eventDispatcher.fire("matchMessageShow", w, new EventArgs()), w.game.window.eventDispatcher.fire("roundEnded", w, new EventArgs()), w.game.increaseTClanScore();
                    break;
                case a.ACTION_CT_WIN:
                    console.log("ACTION_CT_WIN"), w.game.setMessage("Counter-terrorists win", ""), w.game.window.eventDispatcher.fire("matchMessageShow", w, new EventArgs()), w.game.window.eventDispatcher.fire("roundEnded", w, new EventArgs()), w.game.increaseCtClanScore();
                    break;
                case a.ACTION_T_WIN:
                    console.log("ACTION_T_WIN"), w.game.setMessage("Terrorists win", ""), w.game.window.eventDispatcher.fire("matchMessageShow", w, new EventArgs()), w.game.window.eventDispatcher.fire("roundEnded", w, new EventArgs()), w.game.increaseTClanScore();
                    break;
                case a.ACTION_KILL:
                    console.log("ACTION_KILL");
                    var c = w.data.getInt8(void 0),
                        d = w.data.getInt8(void 0),
                        e = w.data.getInt8(void 0),
                        f = c > 20 ? w.game.getCtClan().getPlayer(c - 21) : w.game.getTClan().getPlayer(c - 11),
                        g = d > 20 ? w.game.getCtClan().getPlayer(d - 21) : w.game.getTClan().getPlayer(d - 11);
                    f.setKills(f.getKills() + 1), g.setDeaths(g.getDeaths() + 1), EventDispatcher.getInstance().fire("playerKill", w, new KillEventArgs(f, g, a.getWeaponName(e)));
                    break;
                case a.ACTION_KILL_HE:
                    console.log("ACTION_KILL_HE");
                    var c = w.data.getInt8(void 0),
                        d = w.data.getInt8(void 0),
                        e = w.data.getInt8(void 0),
                        f = c > 20 ? w.game.getCtClan().getPlayer(c - 21) : w.game.getTClan().getPlayer(c - 11),
                        g = d > 20 ? w.game.getCtClan().getPlayer(d - 21) : w.game.getTClan().getPlayer(d - 11);
                    f.setKills(f.getKills() + 1), g.setDeaths(g.getDeaths() + 1), EventDispatcher.getInstance().fire("playerKill", w, new KillEventArgs(f, g, a.getWeaponName(e)));
                    break;
                case a.ACTION_HS:
                    console.log("ACTION_HS");
                    var c = w.data.getInt8(void 0),
                        d = w.data.getInt8(void 0),
                        e = w.data.getInt8(void 0),
                        f = c > 20 ? w.game.getCtClan().getPlayer(c - 21) : w.game.getTClan().getPlayer(c - 11),
                        g = d > 20 ? w.game.getCtClan().getPlayer(d - 21) : w.game.getTClan().getPlayer(d - 11);
                    f.setKills(f.getKills() + 1), g.setDeaths(g.getDeaths() + 1), EventDispatcher.getInstance().fire("playerKill", w, new KillEventArgs(f, g, a.getWeaponName(e), !0));
                    break;
                default:
                    console.error("Unknown action: " + b)
            }
        }, a.prototype.readPlayerActions = function(b) {
            for (var c, d; 0 != (c = w.data.getInt8(void 0));) switch (c) {
                case a.ACTION_MOVE:
                    b.setLocation(w.game.getMap().points[w.data.readShort()]);
                    break;
                case a.ACTION_ANGLE:
                    b.setAngle(w.data.readShort());
                    break;
                case a.ACTION_MONEY:
                    b.setMoney(w.data.readShort());
                    break;
                case a.ACTION_HEALTH:
                    b.setHealth(w.data.getInt8(void 0));
                    break;
                case a.ACTION_FIRE:
                    b.setFiring(!0), b.setFireDelta(0), b.getWeapon().setAmmo(w.data.getInt8(void 0)), w.game.window.eventDispatcher.fire("playerUpdated", w, new PlayerArgs(b));
                    break;
                case a.ACTION_HE:
                    console.log("ACTION_HE"), d = new MapPoint(3 * w.data.readShort() + w.game.getMap().getX(), 3 * w.data.readShort() + w.game.getMap().getY(), !1), w.game.addGrenade(new GrenadeHE(b.getLocation(), d)), b.setHE(!1), w.game.window.eventDispatcher.fire("playerUpdated", w, new PlayerArgs(b));
                    break;
                case a.ACTION_RELOAD:
                    b.getWeapon().setAmmo(w.data.getInt8(void 0)), b.getWeapon().setBackup(w.data.getInt8(void 0));
                    break;
                case a.ACTION_PLANT:
                    w.game.getBomb().setLocation(b.getLocation()), EventDispatcher.getInstance().fire("playerBombPlant", w, new PlayerArgs(b));
                    break;
                case a.ACTION_DEFUSE:
                    EventDispatcher.getInstance().fire("playerBombDefuse", w, new PlayerArgs(b));
                    break;
                case a.ACTION_DROP:
                    d = w.game.getMap().points[w.data.readShort()], w.game.addDroppedWeapon(new DroppedWeapon(d));
                    break;
                case a.ACTION_CHANGE_WEAPON:
                    var e = w.data.getInt8(void 0),
                        f = w.data.getInt8(void 0),
                        g = w.data.getInt8(void 0),
                        h = new Weapon(e, a.getWeaponName(e), f, g);
                    w.changePlayerWeapon(b, b.getWeapon(), h);
                    break;
                case a.ACTION_PICKUP:
                    var e = w.data.getInt8(void 0),
                        f = w.data.getInt8(void 0),
                        g = w.data.getInt8(void 0),
                        h = new Weapon(e, a.getWeaponName(e), f, g);
                    w.changePlayerWeapon(b, b.getWeapon(), h);
                    for (var i = w.game.getDroppedWeapons(), j = 0; j <= i.length; j++)
                        if (i[j].getLocation().x == b.getLocation().x && i[j].getLocation().y == b.getLocation().y) {
                            w.game.removeDroppedWeapon(j);
                            break
                        } break;
                case a.ACTION_DROP_BOMB:
                    d = w.game.getMap().points[w.data.readShort()], w.game.getBomb().setLocation(d), w.game.getBomb().setDropped(!0);
                    break;
                case a.ACTION_PICKUP_BOMB:
                    w.game.getBomb().setDropped(!1);
                    break;
                case a.ACTION_DROP_DEFUSEKIT:
                    d = w.game.getMap().points[w.data.readShort()], w.game.addDroppedDefuseKit(new DroppedDefuseKit(d));
                    break;
                case a.ACTION_PICKUP_DEFUSEKIT:
                    for (var k = w.game.getDroppedDefuseKits(), j = 0; j <= k.length; j++)
                        if (k[j].getLocation().x == b.getLocation().x && k[j].getLocation().y == b.getLocation().y) {
                            w.game.removeDroppedWeapon(j);
                            break
                        } b.setDefuseKit(!0);
                    break;
                case a.ACTION_SHOW:
                    b.setVisible(!0);
                    break;
                case a.ACTION_HIDE:
                    b.setVisible(!1);
                    break;
                default:
                    console.error("Unknown action: " + c)
            }
        }, a.getWeaponName = function(b) {
            return a.WEAPON_NAMES[b]
        }, a.prototype.setGame = function(a) {
            w.game = a
        }, a.prototype.getGame = function() {
            return w.game
        }, a.prototype.getData = function() {
            return w.data
        }, a.prototype.getHomeTacticName = function() {
            return w.homeTacticName
        }, a.prototype.getAwayTacticName = function() {
            return w.awayTacticName
        }, a.prototype.getHomeTacticType = function() {
            return w.homeTacticType
        }, a.prototype.getAwayTacticType = function() {
            return w.awayTacticType
        }, a.prototype.isHalfTime = function() {
            return w.currentRound == a.MAX_ROUNDS + 1
        }, a.prototype.isFullTime = function() {
            return w.currentRound == 2 * a.MAX_ROUNDS + 2
        }, a.prototype.isOverTime = function() {
            return w.currentRound > 2 * a.MAX_ROUNDS + 2
        }, a.prototype.isOvertimeHalfTime = function() {
            return w.isOverTime() && (w.currentRound - 2 * a.MAX_ROUNDS + 2) % a.OVERTIME_MAX_ROUNDS * 2 + 2 > 0 && (w.currentRound - 2 * a.MAX_ROUNDS + 2) % (a.OVERTIME_MAX_ROUNDS + 1) == 0
        }, a.prototype.isOvertimeFullTime = function() {
            return w.isOverTime() && (w.currentRound - 2 * a.MAX_ROUNDS + 2) % (2 * a.OVERTIME_MAX_ROUNDS + 2) == 0
        }, a.prototype.switchTeams = function() {
            w.game.getHomeClan().getTeam() == Clan.TEAM_T ? (w.game.getHomeClan().setTeam(Clan.TEAM_CT), w.game.getAwayClan().setTeam(Clan.TEAM_T)) : (w.game.getHomeClan().setTeam(Clan.TEAM_T), w.game.getAwayClan().setTeam(Clan.TEAM_CT)), w.game.window.eventDispatcher.fire("teamsSwitched", w, new EventArgs())
        }, a.prototype.getMaxRounds = function() {
            if (w.currentRound <= 2 * a.MAX_ROUNDS) return a.MAX_ROUNDS;
            var b = w.currentRound - 2 * a.MAX_ROUNDS;
            return b % (2 * a.OVERTIME_MAX_ROUNDS) == 0 ? (2 * a.MAX_ROUNDS + b) / 2 : 2 * a.MAX_ROUNDS + a.OVERTIME_MAX_ROUNDS * Math.ceil(b / a.OVERTIME_MAX_ROUNDS)
        }, a.prototype.getFrameCount = function() {
            return w.frameCount
        }, a.prototype.getFrameSize = function() {
            return w.frameSize
        }, a.prototype.getCurrentFrame = function() {
            return w.currentFrame
        }, a.prototype.nextRound = function() {
            if (!(w.currentRound >= w.rounds)) {
                var a;
                null == (a = w.roundFramePositions[w.currentRound + 1]) && (a = w.roundFramePositions[w.currentRound] + w.roundFrameMetaSize[w.currentRound] + w.getFrameSize()), w.data.seek(a), w.readRoundStart()
            }
        }, a.prototype.previousRound = function() {
            1 != w.currentRound && (w.data.seek(w.roundFramePositions[--w.currentRound]), --w.currentRound, w.readRoundStart())
        }, a.prototype.restart = function() {
            w.currentRound = 1, w.data.seek(w.roundFramePositions[w.currentRound]), w.readRoundStart()
        }, a.MAX_ROUNDS = 12, a.OVERTIME_MAX_ROUNDS = 3, a.WEAPON_NAMES = ["Grenade", "USP", "Glock", "Deagle", "Berettas", "Five7", "P288", "m3", "xm1014", "mp5", "UMP", "p90", "MAC-10", "TMP", "Galil", "FAMAS", "Ak-47", "Colt", "SIG", "Aug", "Scout", "AWP", "SG-1", "SG-550", "Para"], a.STATIC_ROUND_BYTES = 130, a.TACTIC_STANDARD = 1, a.TACTIC_ECO = 2, a.TACTIC_PISTOL = 4, a.ACTION_MOVE = 1, a.ACTION_ANGLE = 2, a.ACTION_HEALTH = 3, a.ACTION_FIRE = 4, a.ACTION_RELOAD = 5, a.ACTION_MONEY = 6, a.ACTION_PICKUP = 7, a.ACTION_DROP = 8, a.ACTION_PLANT = 9, a.ACTION_PLANTED = 10, a.ACTION_BOMBED = 11, a.ACTION_DEFUSE = 12, a.ACTION_DEFUSED = 13, a.ACTION_CHANGE_WEAPON = 14, a.ACTION_T_WIN = 15, a.ACTION_CT_WIN = 16, a.ACTION_DROP_BOMB = 17, a.ACTION_PICKUP_BOMB = 18, a.ACTION_KILL = 19, a.ACTION_HS = 20, a.ACTION_DROP_DEFUSEKIT = 21, a.ACTION_PICKUP_DEFUSEKIT = 22, a.ACTION_KILL_HE = 23, a.ACTION_HE = 24, a.ACTION_FOW_A = 25, a.ACTION_FOW_B = 26, a.ACTION_SHOW = 27, a.ACTION_HIDE = 28, a.PLAYER_RELOAD = 1, a.PLAYER_DEFUSE = 2, a.PLAYER_BOMB = 4, a.PLAYER_HELMET = 8, a.PLAYER_VEST = 16, a.PLAYER_HE = 128, a.BOMB_PLANT_TIME = 4, a.BOMB_DEFUSE_TIME = 10, a.BOMB_DEFUSE_KIT_TIME = 5, a
    }(),
    PositionEventArgs = function(a) {
        function b(b) {
            a.call(w), w.setPosition(b)
        }
        return __extends(b, a), b.prototype.setPosition = function(a) {
            w.position = a
        }, b.prototype.getPosition = function() {
            return w.position
        }, b
    }(EventArgs);

    jQuery(document).ready(function() {
        var mapProps = [0,0,"de_aztec","../../static/de_aztec.map","../../static/de_aztec.png",876,474,22247],
                map, PIXEL_RATIO, createHiDPICanvas, canvas, context, game;

            map = new Maps.Map(
            mapProps[0],
                    mapProps[1],
                    mapProps[2],
                    mapProps[3],
                    mapProps[4],
                    mapProps[5],
                    mapProps[6],
                    mapProps[7]
            );

            PIXEL_RATIO = (function () {
                var ctx = document.createElement("canvas").getContext("2d"),
                    dpr = window.devicePixelRatio || 1,
                    bsr = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1;

                return dpr / bsr;
            })();

        createHiDPICanvas = function(can, w, h, ratio) {
            if (!ratio) { ratio = PIXEL_RATIO; }
            can.width = w * ratio;
            can.height = h * ratio;
            can.style.width = w + "px";
            can.style.height = h + "px";
            can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);

            return can;
        };

        canvas = document.getElementById("viewPort");

        createHiDPICanvas(canvas, map.width, map.height);

        context = canvas.getContext("2d");

        if (w.d === false) {
          game = TwoDGame.main(context, w.t, w.i);
        } else {
          game = TwoDGame.main(context, w.t, w.i, w.d);
        }

        game.setMap(map);

        console.log(game);

        // Start game looploop
        setInterval(
            function() { game.getGameContainer().render(); }
            , 16);
    });
}