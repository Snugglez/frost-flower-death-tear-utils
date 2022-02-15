module.exports = function reee(d) {
    d.game.initialize('inventory');
    let tearcd = 4, dreamcd = 8,
        gloverolls, bootrolls

    d.game.inventory.on('update', () => {
        try { gloverolls = d.game.inventory.equipment.slots['4'].passivitySets[0].passivities } catch (e) { gloverolls = [] }
        try { bootrolls = d.game.inventory.equipment.slots['5'].passivitySets[0].passivities } catch (e) { bootrolls = [] }
        for (let i = 0; i < gloverolls?.length; i++) {
            if (gloverolls[i] >= 5160270 && gloverolls[i] <= 5160274) tearcd = 8 - gloverolls[i] % 10
        }
        for (let i = 0; i < bootrolls?.length; i++) {
            if ([5160456, 5160457, 5160458].includes(bootrolls[i])) dreamcd = 7
            if ([5160459, 5160460].includes(bootrolls[i])) dreamcd = 6
        }
    })

    function setitemcd(arg, arg2) {
        d.send('S_START_COOLTIME_ITEM', '*', { item: arg, cooldown: arg2 })
    }

    d.hook('S_ABNORMALITY_BEGIN', '*', (e) => {
        if (!d.settings.enabled || !d.settings.hide) return
        if (e.id >= 19171 && e.id <= 19174 || e.id >= 19180 && e.id <= 19189) return false
    })

    d.hook('S_PARTY_MEMBER_ABNORMAL_ADD', '*', (e) => {
        if (!d.settings.enabled || !d.settings.hide) return
        if (e.id >= 19171 && e.id <= 19174 || e.id >= 19180 && e.id <= 19189) return false
    })

    d.hook('S_EACH_SKILL_RESULT', '*', (e) => {
        if (!d.settings.enabled) return
        if ([99930001, 99930002, 99930003].includes(e.skill.id)) setitemcd(6550, dreamcd)
        if (e.skill.id == 99930000) setitemcd(6560, tearcd)
        if (!d.settings.hide) return
        if (e.skill.id >= 99930000 && e.skill.id <= 99930003) return false
        if (e.skill.id >= 3000 && e.skill.id <= 3005) return false
    })

    d.hook('S_ACTION_STAGE', '*', (e) => {
        if (!d.settings.enabled || !d.settings.hide) return
        if (e.skill.id >= 99930000 && e.skill.id <= 99930003) return false
        if (e.skill.id >= 3000 && e.skill.id <= 3005) return false
    })

    d.hook('S_SPAWN_PROJECTILE', '*', (e) => {
        if (!d.settings.enabled || !d.settings.hide) return
        if (e.skill.id == 3001 && e.huntingZone == 1023) return false
    })

    d.command.add('ffdtu', (arg) => {
        if (!arg) {
            d.settings.enabled = !d.settings.enabled
            d.command.message(`${d.settings.enabled ? 'en' : 'dis'}abled`)
        }
        if (arg == 'hide') {
            d.settings.hide = !d.settings.hide
            d.command.message(`hide mode ${d.settings.hide ? 'en' : 'dis'}abled`)
        }
    })
}