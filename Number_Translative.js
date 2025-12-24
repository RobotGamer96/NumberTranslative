/*
   This extension was made with TurboBuilder!
   https://turbobuilder-steel.vercel.app/
*/
(async function(Scratch) {
    const variables = {};
    const blocks = [];
    const menus = {};


    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be unsandboxed to run!")
        return
    }

    function doSound(ab, cd, runtime) {
        const audioEngine = runtime.audioEngine;

        const fetchAsArrayBufferWithTimeout = (url) =>
            new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                let timeout = setTimeout(() => {
                    xhr.abort();
                    reject(new Error("Timed out"));
                }, 5000);
                xhr.onload = () => {
                    clearTimeout(timeout);
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error(`HTTP error ${xhr.status} while fetching ${url}`));
                    }
                };
                xhr.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error(`Failed to request ${url}`));
                };
                xhr.responseType = "arraybuffer";
                xhr.open("GET", url);
                xhr.send();
            });

        const soundPlayerCache = new Map();

        const decodeSoundPlayer = async (url) => {
            const cached = soundPlayerCache.get(url);
            if (cached) {
                if (cached.sound) {
                    return cached.sound;
                }
                throw cached.error;
            }

            try {
                const arrayBuffer = await fetchAsArrayBufferWithTimeout(url);
                const soundPlayer = await audioEngine.decodeSoundPlayer({
                    data: {
                        buffer: arrayBuffer,
                    },
                });
                soundPlayerCache.set(url, {
                    sound: soundPlayer,
                    error: null,
                });
                return soundPlayer;
            } catch (e) {
                soundPlayerCache.set(url, {
                    sound: null,
                    error: e,
                });
                throw e;
            }
        };

        const playWithAudioEngine = async (url, target) => {
            const soundBank = target.sprite.soundBank;

            let soundPlayer;
            try {
                const originalSoundPlayer = await decodeSoundPlayer(url);
                soundPlayer = originalSoundPlayer.take();
            } catch (e) {
                console.warn(
                    "Could not fetch audio; falling back to primitive approach",
                    e
                );
                return false;
            }

            soundBank.addSoundPlayer(soundPlayer);
            await soundBank.playSound(target, soundPlayer.id);

            delete soundBank.soundPlayers[soundPlayer.id];
            soundBank.playerTargets.delete(soundPlayer.id);
            soundBank.soundEffects.delete(soundPlayer.id);

            return true;
        };

        const playWithAudioElement = (url, target) =>
            new Promise((resolve, reject) => {
                const mediaElement = new Audio(url);

                mediaElement.volume = target.volume / 100;

                mediaElement.onended = () => {
                    resolve();
                };
                mediaElement
                    .play()
                    .then(() => {
                        // Wait for onended
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });

        const playSound = async (url, target) => {
            try {
                if (!(await Scratch.canFetch(url))) {
                    throw new Error(`Permission to fetch ${url} denied`);
                }

                const success = await playWithAudioEngine(url, target);
                if (!success) {
                    return await playWithAudioElement(url, target);
                }
            } catch (e) {
                console.warn(`All attempts to play ${url} failed`, e);
            }
        };

        playSound(ab, cd)
    }
    class Extension {
        getInfo() {
            return {
                "id": "NumberTranslative",
                "name": "Number Translative",
                "color1": "#59c059",
                "color2": "#50ad50",
                "blocks": blocks,
                "menus": menus
            }
        }
    }
    blocks.push({
        opcode: "bronzeratio",
        blockType: Scratch.BlockType.REPORTER,
        text: "β",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["bronzeratio"] = async (args, util) => {
        return 3.302775637731995
    };

    blocks.push({
        opcode: "silverratio",
        blockType: Scratch.BlockType.REPORTER,
        text: "δs",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["silverratio"] = async (args, util) => {
        return 2.414213562373095
    };

    blocks.push({
        opcode: "powersof2",
        blockType: Scratch.BlockType.REPORTER,
        text: "2^[x]",
        arguments: {
            "x": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["powersof2"] = async (args, util) => {
        return (2 ** args["x"])
    };

    blocks.push({
        opcode: "powersof10",
        blockType: Scratch.BlockType.REPORTER,
        text: "10^[x]",
        arguments: {
            "x": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["powersof10"] = async (args, util) => {
        return (10 ** args["x"])
    };

    blocks.push({
        opcode: "cubed",
        blockType: Scratch.BlockType.REPORTER,
        text: "[x]^3",
        arguments: {
            "x": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["cubed"] = async (args, util) => {
        return (args["x"] ** 3)
    };

    blocks.push({
        opcode: "squared",
        blockType: Scratch.BlockType.REPORTER,
        text: "[x]^2",
        arguments: {
            "x": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["squared"] = async (args, util) => {
        return (args["x"] ** 2)
    };

    blocks.push({
        opcode: "root of",
        blockType: Scratch.BlockType.REPORTER,
        text: "[root] root of [number]",
        arguments: {
            "root": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
            },
            "number": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["root of"] = async (args, util) => {
        return (args["number"] ** (1 / args["root"]))
    };

    blocks.push({
        opcode: "aturnof",
        blockType: Scratch.BlockType.REPORTER,
        text: "aturn of [num1] of [num2]",
        arguments: {
            "num1": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 43,
            },
            "num2": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 47,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["aturnof"] = async (args, util) => {
        return (((Math.cos(((args["num1"] + args["num2"]) - 1)) * args["num1"]) / (args["num2"] + 3)) ** -1)
    };

    blocks.push({
        opcode: "phi",
        blockType: Scratch.BlockType.REPORTER,
        text: "ϕ",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["phi"] = async (args, util) => {
        return 1.618033988749895
    };

    blocks.push({
        opcode: "rantnumber",
        blockType: Scratch.BlockType.REPORTER,
        text: "rant([x])",
        arguments: {
            "x": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["rantnumber"] = async (args, util) => {
        return (((Math.cos((2 ** (1 / args["x"]))) ** 3) * 53) / 47)
    };

    blocks.push({
        opcode: "turnof",
        blockType: Scratch.BlockType.REPORTER,
        text: "turn of [num1] of [num2]",
        arguments: {
            "num1": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 43,
            },
            "num2": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 47,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["turnof"] = async (args, util) => {
        return ((Math.cos(((args["num1"] + args["num2"]) - 1)) * args["num1"]) / (args["num2"] + 3))
    };

    Scratch.extensions.register(new Extension());
})(Scratch);
