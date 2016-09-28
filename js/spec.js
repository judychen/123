var jsSpec = {
    "spec": {
        "radios":[
            {
                "name": "2.4G",
                "default_ssid": "CommSky_2.4G",
                "radio_mode":[
                    "802.11g",
                    "802.11gn/20M",
                    "802.11gn/40M",
                    "802.11nonly/20M",
                    "802.11nonly/40M"
                ]
            },
            {
                "name": "5G",
                "default_ssid": "CommSky_5G",
                "radio_mode":[
                    "802.11a",
                    "802.11an/20M",
                    "802.11an/40M",
                    "802.11nonly/20M",
                    "802.11nonly/40M"
                ]
            },
        ],
        "dot11n":15,
        "nat":"enable"
    }
};

/*设备信息*/
var jsDataDevice = {
    "device":[
        {
            "product":"AP3602",
            "model":"AP3602-WS1-FAT",
            "serial":"A2A9C11Z0091004",
            "ethmac":"34:CD:6D:F3:FE:A0",
            "softversion":"V200R006P02",
            "bootversion":"1.0.3",
            "hardversion":"A",
            "uptime":"2天11时28分",
            "cpu_usage":"0",
            "mem_usage":"63",
            "gateway":"172.20.90.1",
            "dns":"114.114.114.114"
        }
    ]
};

/*接口信息*/
var jsDataInterface = {
    "pkg_interface":[
        {
            "sect_name":"GigabitEthernet0/0",
            "ipaddr":"",
            "enabled":"enabled",
            "linkmode":"bridge",
            "mtu":"1500"
        },
        {
            "sect_name":"Vlan-interface1", 
            "ipaddr":"172.20.90.219/255.255.255.0",
            "enabled":"enabled",
            "mtu":"1500"
        }
    ]
};

/*三层接口信息*/
var jsIfStatus = {
     "if_giga_eth_status":{
        "GigabitEthernet0/0":"UP"
     }, 
     "if_eth_status":{},
     "if_vlan_status":{
        "Vlan-interface1":"UP"
     } 
};

/*CAPWAP信息*/
var jsCapwapStatus = {
    "status":"已连接",
    "day":"0",
    "hour":"01",
    "munite":"31",
    "server_name":"",
    "ip":"172.20.90.240"
};

/*无线服务情况*/
var jsWirelessServ = {
    "status":"ok", 
    "data":[
        {
            "bss_id":0, 
            "radio_id":0, 
            "ssid":"123", 
            "auth":"None", 
            "up":1 
        },
        {
            "bss_id":1, 
            "radio_id":1, 
            "ssid":"123", 
            "auth":"None", 
            "up":1 
        }
    ]
};

/*射频信息*/
var jsRadio = {
    "status":"ok", 
    "data":[
        {
            "id":0, 
            "mode":"gn", 
            "rts_threshold":2346, 
            "frag_threshold":2346, 
            "channel":6, 
            "txPower":23, 
            "bss_count":1, 
            "bandwidth":20, 
            "enabled":"1"
        },
        {
            "id":1, 
            "mode":"an", 
            "rts_threshold":2346, 
            "frag_threshold":2346, 
            "channel":149, 
            "txPower":23, 
            "bss_count":1, 
            "bandwidth":40, 
            "enabled":"1"
        }
    ]
};

var jsRadio2 = {
        "pkg_wlan_radio": [
        {
            "sect_name": "WLAN-Radio0\/0",
            "beacon-interval": "100", 
            "max-power": "auto", 
            "dtim": "1", 
            "fragment-threshold": "2346", 
            "rts-threshold": "2346", 
            "a-mpdu": "enabled", 
            "mode": "gn", 
            "channel": "6", 
            "distance": "1", 
            "bandwidth": "20", 
            "dot11nonly": "disabled", 
            "preamble": "short", 
            "protection-mode": "cts-to-self", 
            "short-gi": "enabled", 
            "bind": [
                { 
                    "bind": "0-0"
                }
            ],
            "rssi-access": "disabled", 
            "rssi-access-threshold": "-80", 
            "bcast-ratelimit": "disabled", 
            "bcast-ratelimit-cir": "10", 
            "bcast-ratelimit-cbs": "30", 
            "atf": "disabled", 
            "device_mode": "normal", 
            "dot11aconly": "disabled" 
        }, 
        {
            "sect_name": "WLAN-Radio0\/1", 
            "beacon-interval": "100", 
            "max-power": "auto", 
            "dtim": "1", 
            "fragment-threshold": "2346", 
            "rts-threshold": "2346", 
            "a-mpdu": "enabled", 
            "mode": "an", 
            "channel": "149", 
            "distance": "1", 
            "bandwidth": "40", 
            "dot11nonly": "disabled", 
            "preamble": "short", 
            "protection-mode": "cts-to-self", 
            "short-gi": "enabled", 
            "bind": [
                { 
                    "bind": "1-1" 
                } 
            ], 
            "rssi-access": "disabled", 
            "rssi-access-threshold": "-77", 
            "bcast-ratelimit": "disabled", 
            "bcast-ratelimit-cir": "10", 
            "bcast-ratelimit-cbs": "30", 
            "atf": "disabled", 
            "device_mode": "normal", 
            "dot11aconly": "disabled" 
        } 
    ] 
};

/*客户端信息*/
var jsClientList = {
    "status":"ok", 
    "data":[
        {
            "radio":"0",
            "bss":"1",
            "mac":"18:CF:5E:7A:EC:D5",
            "ip":"172.20.90.168",
            "uptime":"00:00:12",
            "aid":1,
            "rssi":39,
            "idle":0,
            "tx_rate":300,
            "rx_rate":299,
            "cipher":"None"
        }
    ]
};

var jsServTpl = {
    "pkg_wlan_service_template": [
        { 
            "sect_name": "ServiceTemplate0", 
            "beacon_ssid_hide": "disabled", 
            "client_max": "127", 
            "ptk_lifetime": "3600", 
            "gtk_lifetime": "86400", 
            "ptk_enabled": "disabled", 
            "gtk_enabled": "disabled", 
            "wep_key_slot": "1", 
            "psk-key-type": "passphrase", 
            "psk-key-crypt": "plain", 
            "wep40_key_type_1": "passphrase", 
            "wep40_key_crypt_1": "plain", 
            "wep108_key_type_1": "passphrase", 
            "wep108_key_crypt_1": "plain", 
            "ssid": "CommSky_2.4G", 
            "cipher": "ccmp", 
            "authentication": "wpa2-psk", 
            "psk-key": "12345678", 
            "service-template": "enabled", 
            "m2u_enable": "disabled", 
            "dynamic-uplink-ratelimit": "0", 
            "dynamic-downlink-ratelimit": "0", 
            "static-uplink-ratelimit": "0", 
            "static-downlink-ratelimit": "0" 
        }, 
        { 
            "sect_name": "ServiceTemplate1", 
            "beacon_ssid_hide": "disabled", 
            "client_max": "127", 
            "ptk_lifetime": "3600", 
            "gtk_lifetime": "86400", 
            "ptk_enabled": "disabled", 
            "gtk_enabled": "disabled", 
            "wep_key_slot": "1", 
            "psk-key-type": "passphrase", 
            "psk-key-crypt": "plain", 
            "wep40_key_type_1": "passphrase", 
            "wep40_key_crypt_1": "plain", 
            "wep108_key_type_1": "passphrase", 
            "wep108_key_crypt_1": "plain", 
            "psk-key": "12345678", 
            "m2u_enable": "disabled", 
            "dynamic-uplink-ratelimit": "0", 
            "dynamic-downlink-ratelimit": "0", 
            "static-uplink-ratelimit": "0", 
            "static-downlink-ratelimit": "0",
            "authentication": "open", 
            "cipher": "none", 
            "ssid": "123", 
            "service-template": "enabled"  
        } 
    ] 
};

/*WDS信息*/
var jsWds = {
    "wds_status":{
        "mode":"rootap",
        "status":"1",
        "ref_netid":"2",
        "level":"3"
    }
};

var jsNtp = { 
    "pkg_time": [
       { 
            "sect_name": "ntpclient", 
            "server": [
                { 
                    "server": "ntp.commsky.com.cn" 
                }, 
                { 
                    "server": "time.nist.gov" 
                }, 
                { 
                    "server": "time.windows.com" 
                }
            ], 
            "enabled": "enabled", 
            "period": "86400" 
        } 
    ] 
};


