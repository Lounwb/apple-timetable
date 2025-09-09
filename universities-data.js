// 中国大陆主要大学信息数据库
const universitiesData = {
    // 985工程大学
    "清华大学（北京校区）": {
        "address": "北京市海淀区清华园1号",
        "classesPerDay": null,
        "classTimes": []
    },
    "北京大学（校本部）": {
        "address": "北京市海淀区颐和园路5号",
        "classesPerDay": null,
        "classTimes": []
    },
    "电子科技大学（清水河校区）": {
        "address": "成都市高新区（西区）西源大道2006号",
        "classesPerDay": null,
        "classTimes": []
    },
    "电子科技大学（沙河校区）": {
        "address": "成都市成华区建设北路二段4号",
        "classesPerDay": null,
        "classTimes": []
    },
    "电子科技大学（九里堤校区）": {
        "address": "成都市金牛区九里堤西路8号",
        "classesPerDay": null,
        "classTimes": []
    },
    "四川大学（望江校区）": {
        "address": "成都市武侯区一环路南一段24号",
        "classesPerDay": null,
        "classTimes": []
    },
    "四川大学（华西校区）": {
        "address": "成都市武侯区人民南路三段17号",
        "classesPerDay": null,
        "classTimes": []
    },
    "四川大学（江安校区）": {
        "address": "成都市双流区川大路二段2号",
        "classesPerDay": null,
        "classTimes": []
    },
    "中国矿业大学（南湖校区）": {
        "address": "江苏省徐州市铜山区大学路1号",
        "classesPerDay": null,
        "classTimes": []
    },
    "中国矿业大学（文昌校区）": {
        "address": "江苏省徐州市泉山区金山东路1号",
        "classesPerDay": null,
        "classTimes": []
    },
    "大连理工大学（主校区）": {
        "address": "辽宁省大连市甘井子区凌工路2号",
        "classesPerDay": null,
        "classTimes": []
    },
    "大连理工大学（开发区校区）": {
        "address": "辽宁省大连市金普新区图强路321号",
        "classesPerDay": null,
        "classTimes": []
    },
    "大连理工大学（盘锦校区）": {
        "address": "辽宁省盘锦市辽东湾新区大工路2号",
        "classesPerDay": null,
        "classTimes": []
    },
    "山东大学（中心校区）": {
        "address": "山东省济南市历城区山大南路27号",
        "classesPerDay": null,
        "classTimes": []
    },
    "山东大学（威海校区）": {
        "address": "山东省威海市文化西路180号",
        "classesPerDay": null,
        "classTimes": []
    },
    "山东大学（青岛校区）": {
        "address": "山东省青岛市即墨区滨海路72号",
        "classesPerDay": null,
        "classTimes": []
    },
    "北京师范大学（北京校区）": {
        "address": "北京市海淀区新街口外大街19号",
        "classesPerDay": null,
        "classTimes": []
    },
    "北京师范大学（珠海校区）": {
        "address": "广东省珠海市香洲区唐家湾金凤路18号",
        "classesPerDay": null,
        "classTimes": []
    },
    "中山大学（广州南校园）": {
        "address": "广州市海珠区新港西路135号",
        "classesPerDay": null,
        "classTimes": []
    },
    "中山大学（珠海校区）": {
        "address": "珠海市香洲区唐家湾大学路2号",
        "classesPerDay": null,
        "classTimes": []
    },
    "中山大学（深圳校区）": {
        "address": "深圳市光明区公常路66号",
        "classesPerDay": null,
        "classTimes": []
    },
    "华南理工大学（五山校区）": {
        "address": "广州市天河区五山路381号",
        "classesPerDay": null,
        "classTimes": []
    },
    "华南理工大学（大学城校区）": {
        "address": "广州市番禺区广州大学城外环东路382号",
        "classesPerDay": null,
        "classTimes": []
    },
    "华南理工大学（广州国际校区）": {
        "address": "广州市番禺区兴业大道东777号",
        "classesPerDay": null,
        "classTimes": []
    },
    "西安交通大学（兴庆校区）": {
        "address": "西安市碑林区咸宁西路28号",
        "classesPerDay": null,
        "classTimes": []
    },
    "西安交通大学（雁塔校区）": {
        "address": "西安市雁塔区雁塔西路76号",
        "classesPerDay": null,
        "classTimes": []
    },
    "西安交通大学（曲江校区）": {
        "address": "西安市雁塔区雁翔路99号",
        "classesPerDay": null,
        "classTimes": []
    },
    "西安交通大学（苏州研究院）": {
        "address": "苏州市工业园区独墅湖科教创新区仁爱路99号",
        "classesPerDay": null,
        "classTimes": []
    },
    "西北工业大学（友谊校区）": {
        "address": "西安市碑林区友谊西路127号",
        "classesPerDay": null,
        "classTimes": []
    },
    "西北工业大学（长安校区）": {
        "address": "西安市长安区东大镇东大村",
        "classesPerDay": null,
        "classTimes": []
    },
    "中国地质大学（武汉）（南望山校区）": {
        "address": "湖北省武汉市洪山区鲁磨路388号",
        "classesPerDay": null,
        "classTimes": []
    },
    "中国地质大学（武汉）（未来城校区）": {
        "address": "湖北省武汉市东湖新技术开发区锦程街68号",
        "classesPerDay": null,
        "classTimes": []
    },
    "北京理工大学（中关村校区）": {
        "address": "北京市海淀区中关村南大街5号",
        "classesPerDay": null,
        "classTimes": []
    },
    "北京理工大学（良乡校区）": {
        "address": "北京市房山区良乡高教园区",
        "classesPerDay": null,
        "classTimes": []
    },
    "北京理工大学（珠海校区）": {
        "address": "广东省珠海市唐家湾金凤路6号",
        "classesPerDay": null,
        "classTimes": []
    },
    "山东大学（软件园校区）": {
        "address": "山东省济南市历下区舜华路1500号",
        "classesPerDay": null,
        "classTimes": []
    },
    "山东大学（洪家楼校区）": {
        "address": "山东省济南市历城区洪家楼5号",
        "classesPerDay": null,
        "classTimes": []
    },
    "浙江大学（紫金港校区）": {
        "address": "浙江省杭州市西湖区余杭塘路866号",
        "classesPerDay": null,
        "classTimes": []
    },
    "浙江大学（玉泉校区）": {
        "address": "浙江省杭州市西湖区浙大路38号",
        "classesPerDay": null,
        "classTimes": []
    },
    "清华大学（深圳国际研究生院）": {
        "address": "深圳市南山区西丽大学城清华园区",
        "classesPerDay": null,
        "classTimes": []
    },
    "北京大学（深圳研究生院）": {
        "address": "深圳市南山区西丽镇丽水路2199号",
        "classesPerDay": null,
        "classTimes": []
    },
    "哈尔滨工业大学（深圳）": {
        "address": "深圳市南山区桃源街道深圳大学城哈尔滨工业大学校区",
        "classesPerDay": null,
        "classTimes": []
    },
    "西安交通大学（创新港校区）": {
        "address": "西安市长安区学森一路中国西部科技创新港1号巨构2096",
        "classesPerDay": null,
        "classTimes": []
    },
    "南京大学（苏州校区）": {
        "address": "苏州市高新区太湖大道1520号",
        "classesPerDay": null,
        "classTimes": []
    },
    "武汉大学（医学部校区）": {
        "address": "湖北省武汉市武昌区东湖路115号",
        "classesPerDay": null,
        "classTimes": []
    },
    "中国矿业大学（北京）（沙河校区）": {
        "address": "北京市昌平区沙河高教园区南二街9号",
        "classesPerDay": null,
        "classTimes": []
    },
    "中国石油大学（华东）（古镇口校区）": {
        "address": "山东省青岛市黄岛区海军路6号",
            "classesPerDay": null,
                "classTimes": []
    },
    "合肥工业大学（宣城校区）": {
        "address": "安徽省宣城市宣州区薰化路301号",
            "classesPerDay": null,
                "classTimes": []
    },
    "武汉理工大学（余家头校区）": {
        "address": "武汉市武昌区和平大道1178号",
            "classesPerDay": null,
                "classTimes": []
    },
    "中山大学（深圳校区）": {
        "address": "深圳市光明区公常路66号",
            "classesPerDay": null,
                "classTimes": []
    },
    "复旦大学（张江校区）": {
        "address": "上海市浦东新区张衡路825号",
            "classesPerDay": null,
                "classTimes": []
    },
    "上海交通大学（闵行校区）": {
        "address": "上海市闵行区东川路800号",
            "classesPerDay": null,
                "classTimes": []
    },
    "山东大学（威海校区）": {
        "address": "山东省威海市文化西路180号",
            "classesPerDay": null,
                "classTimes": []
    },
    "山东大学（青岛校区）": {
        "address": "山东省青岛市即墨区滨海路72号",
            "classesPerDay": null,
                "classTimes": []
    },
    "北京交通大学（威海校区）": {
        "address": "山东省威海市南海新区现代路69号",
            "classesPerDay": null,
                "classTimes": []
    },
    "南京理工大学（江阴校区）": {
        "address": "江苏省无锡市江阴市福星路8号",
        "classesPerDay": null,
        "classTimes": []
    },
    "华北电力大学（保定校区）": {
        "address": "河北省保定市莲池区永华北大街619号",
        "classesPerDay": null,
        "classTimes": []
    },
    "北京邮电大学（沙河校区）": {
        "address": "北京市昌平区沙河高教园区南三街",
        "classesPerDay": null,
        "classTimes": []
    },
    "华中科技大学（同济医学院）": {
        "address": "武汉市江汉区航空路13号",
        "classesPerDay": null,
        "classTimes": []
    }
};

// 导出数据（如果在Node.js环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = universitiesData;
}

// 全局变量（用于浏览器环境）
if (typeof window !== 'undefined') {
    window.universitiesData = universitiesData;
}
