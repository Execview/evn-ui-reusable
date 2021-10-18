const orderedObjectAssign = (o, ukey, uval) => {
    return Object.keys(o).reduce((total, key) => { const newVal = key === ukey ? uval : o[key]; return { ...total, [key]: newVal }; }, {});
};

export default orderedObjectAssign;