export default {
    'copy': {
        'name': 'copy',
        'enabled': true,
        'params': {
            'soundName': 'pinknoise',
            'delay': 0,
            'startOffset': 0,
            'endOffset': 0,
            'fadeInOffset': 0,
            'fadeOutOffset': 0
        },
        'buffer': null
    },
    'bitcrush': {
        'name': 'bitcrush',
        'enabled': true,
        'params': {
            'downsample': 20
        },
        'buffer': null
    },
    'delay': {
        'name': 'delay',
        'enabled': true,
        'params': {
            'delay': 10000,
            'feedback': 0.25
        },
        'buffer': null
    },
    'flanger': {
        'name': 'flanger',
        'enabled': true,
        'params': {
            'speed': 24000
        },
        'buffer': null
    }
}