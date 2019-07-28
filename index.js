const firstBossActions =
{
    1106: {msg: 'Headbut! (Slow)'},
    2106: {msg: 'Headbut! (Fast)'},
    2102: {msg: 'Iframe/Block!'}
}

const secondBossActions =
{
    1102: {msg: 'Spin! (Slow)'},
    2102: {msg: 'Spin! (Fast)'},
    1106: {msg: 'Frontal Slam! (Slow)'},
    2106: {msg: 'Frontal Slam! (Fast)'},
    1107: {msg: 'Barrage! (Slow)'},
    2107: {msg: 'Barrage! (Fast)'},
    1301: {msg: 'Push Back!'},
    1302: {msg: 'PYLON LASER!'},
    1304: {msg: 'SECONDARY LASER!'},
    1305: {msg: 'AoE Explosions!'}
};

/*const thirdBossActions = 
{

}; */

const firstBoss = 91650;
const secondBoss = 91606;
//const thirdBoss = ;

module.exports = function SkyCruiserGuide(mod)
{
    let hooks = [],
    enabled = true;

    mod.command.add(['sc'],(arg) => {
        if(arg && arg.length > 0) arg = arg.toLowerCase();
        enabled = !enabled;
        mod.command.message(`Sky Cruiser Guide ${enabled ? 'Enabled' : 'Disabled'}`);
        if(!enabled) unload_guide();
    });
    
        mod.hook('S_LOAD_TOPO',3,(event) => {
        if(event.zone === 9916 && enabled)
        {
            mod.command.message('Welcome to Sky Cruiser - Extreme Mode');
            load_guide();
        }
        else
        {
            unload_guide();
        }
    });
    
    function load_guide()
    {
        if(!hooks.length)
        {
            hook('S_ACTION_STAGE',9,(event) => {
                if(!enabled) return;
                let skill = event.skill.id;
                switch(event.templateId)
                {   
                    case firstBoss:
                        if(firstBossActions[skill])
                        {
                            sendMessage(firstBossActions[skill].msg);
                        }
                    break;
                    case secondBoss:
                        if(secondBossActions[skill])
                        {
                            sendMessage(secondBossActions[skill].msg);
                        }
                    break;
                    /*case thirdBoss:      
                        if(thirdBossActions[skill])
                        {   
                            sendMessage(thirdBossActions[skill].msg);
                        }
                    break;*/
                }
            });
        }
 
    }



    function sendMessage(msg)
    {
            mod.send('S_CHAT',1,{
            channel: 21, 
            authorName: 'Guide',
            message: msg
        });
    }

    function unload_guide() 
    {
		if(hooks.length) {
			for(let h of hooks) mod.unhook(h)

			hooks = []
		}
	}

    function hook() 
    {
		hooks.push(mod.hook(...arguments))
	}
    
}