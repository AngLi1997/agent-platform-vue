const menuData = [{
    "key": "dashboard",
    "label": "控制台",
    "icon": "dashboard",
    "path": "/dashboard",
    "children": [
        {
            "key": "analysis",
            "label": "欢迎",
            "icon": "dashboard",
            "path": "/dashboard/welcome",
        }
    ]
},
    {
        "key": "flow",
        "label": "工作流",
        "icon": "flow",
        "path": "/flow",
        "children": [
            {
                "key": "llm",
                "label": "模型管理",
                "icon": "llm",
                "path": "/flow/llm"
            },
            {
                "key": "tools",
                "label": "工具管理",
                "icon": "tools",
                "path": "/flow/tools"
            },
            {
                "key": "agent",
                "label": "Agent管理",
                "icon": "agent",
                "path": "/flow/agent"
            },{
                "key": "process",
                "label": "流程管理",
                "icon": "process",
                "path": "/flow/process"
            },{
                "key": "knowledge",
                "label": "知识库管理",
                "icon": "knowledge",
                "path": "/flow/knowledge"
            }
        ]
    },
    // {
    //     "key": "system",
    //     "label": "系统管理",
    //     "icon": "setting",
    //     "path": "/system",
    //     "children": [
    //         {
    //             "key": "users",
    //             "label": "用户管理",
    //             "icon": "dashboard",
    //             "path": "/system/users"
    //         }, {
    //             "key": "roles",
    //             "label": "角色管理",
    //             "icon": "dashboard",
    //             "path": "/system/roles"
    //         }, {
    //             "key": "permission",
    //             "label": "权限管理",
    //             "icon": "dashboard",
    //             "path": "/system/permission"
    //         }, {
    //             "key": "config",
    //             "label": "系统配置",
    //             "icon": "config",
    //             "path": "/system/config"
    //         }
    //     ]
    // }
]

export default menuData