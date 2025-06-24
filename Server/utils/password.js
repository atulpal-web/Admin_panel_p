const bcrypt = require('bcryptjs');
exports.plainToHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
}

exports.hashToPlain = async (password, hash_pass)=>{
    return await bcrypt.compare(password, hash_pass);
}