{
    'target_defaults': {
        'defines': [
            'ENABLE_ESS_ASSERTIONS',
        ],
        "conditions": [
            ["OS=='win'", { 
                'defines': [
                    'UNICODE',
                    '_UNICODE',
                    'CRT_SECURE_NO_WARNINGS',
                    '_HAS_EXCEPTIONS=1'
                ],
                "msvs_settings": {
                    "VCCLCompilerTool": {
                        "ExceptionHandling": 1,
                        'MultiProcessorCompilation': 'true',
                        'WarningLevel': 4,
                        'WarnAsError': 'false'
                    }
                },
            }],
            ["OS=='mac'", { 
                'xcode_settings': {
                    'BUILD_DIR': '<(build_dir)',
                    'MACOSX_DEPLOYMENT_TARGET': '10.12',
                    'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
                    'GCC_ENABLE_CPP_RTTI':'YES',
                    'CLANG_ENABLE_OBJC_ARC': 'YES',
                    'GCC_WARN_ABOUT_DEPRECATED_FUNCTIONS': 'NO',
                }
            }]
        ],
        'configurations': {
            'Debug': {
                "conditions": [
                    ["OS=='mac'", { 
                        'xcode_settings': {
                            'LD_RUNPATH_SEARCH_PATHS': [
                                './node_modules/libuv_problems/build/Debug/',  # when installed as a dependency
                                './build/Debug/',
                                '@loader_path'                                 # near plug-in 
                            ],
                            'DEBUG_INFORMATION_FORMAT': 'dwarf',
                        }
                    }],
                    ["OS=='win'", { 
                        "msvs_settings": {
                            "VCCLCompilerTool": {
                                'Optimization': 0,
                                'InlineFunctionExpansion': '1',
                                'OmitFramePointers': 'false',
                                'WholeProgramOptimization': 'false',
                                'RuntimeTypeInfo': 'true',
                            }
                        }
                    }]
                ]
            }
        },
    },
    'targets': [
        {
            'target_name': 'libuv_problems',
            'include_dirs': [
                'src',
                '<!(node -e \"require(\'nan\')\")',
                'node_modules/nan'
            ],
            'sources': [
                'src/libuv_problems_module.cpp'
            ]
        }
    ]
}
