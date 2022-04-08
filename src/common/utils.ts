import { UnauthorizedException } from '@nestjs/common';
import * as moment from 'moment';
import { createHash, randomFillSync } from 'crypto';
import * as bcrypt from 'bcrypt';
// import jwtDecode, { JwtPayload } from "jwt-decode";
const decodeJson = require("unescape-json");
const xss = require("xss");
export const comparePasswords = async (userPassword, currentPassword) => {
    return await bcrypt.compare(currentPassword, userPassword);
};

// export class JwtUtil {
//     static getUserId(token: any) {
//         const decoded = jwtDecode<object>(token);
//         if (!decoded || !decoded['id'])
//             throw new UnauthorizedException();
//         return decoded['id'];
//     }
// }

export const dateCreated = () => {
    // return new Date(moment().utcOffset(420).format("YYYY-MM-DD HH:mm:ss"));
    return new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
};

export const setValueCommonColumns = (obj, user) => {
    obj['createDatetime'] = obj['updateDatetime'] = new Date(
        moment().format('YYYY-MM-DD HH:mm:ss'),
    );
    obj['createId'] = obj['updateId'] = user ? user.userId : '9999';
    return obj;
};

export const updateValueCommonColumns = (obj, user) => {
    obj['updateDatetime'] = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    obj['updateId'] = user ? user.userId : '9999';
    return obj;
};

export const datetoString = (format: string) => {
    return moment().format(format);
};

var arrayShuffle = function (array) {
    for (var i = 0, length = array.length, swap = 0, temp = ''; i < length; i++) {
        swap = Math.floor(Math.random() * (i + 1));
        temp = array[swap];
        array[swap] = array[i];
        array[i] = temp;
    }
    return array;
};

export const percentageChance = function (values, chances) {
    for (var i = 0, pool = []; i < chances.length; i++) {
        for (var i2 = 0; i2 < chances[i]; i2++) {
            pool.push(i);
        }
    }
    return values[arrayShuffle(pool)['0']];
};

export const randomNumber = function (max) {
    return Math.floor(Math.random() * max) + 1;
};

export const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const generateInviteKey = (inputValue: any) => {
    if (!inputValue) return null;

    let source = '';
    if (inputValue instanceof Array) {
        inputValue.forEach((str) => (source += str));
    } else {
        source = inputValue;
    }
    let numberOfRound = randomInRange(20, 200);
    for (let i = 0; i < numberOfRound; i++) {
        source = createHash('sha256').update(source).digest('hex');
    }
    return source;
};

export const generatePassword = () => {
    const wishlist =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';
    const length = randomInRange(6, 10);
    let pwd = Array.from(randomFillSync(new Uint32Array(length)))
        .map((x) => wishlist[x % wishlist.length])
        .join('');
    return pwd;
};

export const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export const IsEmpty = (inputValue: string) => {
    return inputValue == null || inputValue.trim().length == 0;
}

export const escapeJson = (data) => {
    const jsonString = JSON.stringify(data)
    if (typeof jsonString !== 'string') {
        return jsonString;
    }
    // const result = jsonString.replace(/</g, '\\u003c')
    //     .replace(/>/g, '\\u003e')
    //     .replace(/&/g, '\\u0026')
    //     .replace(/'/g, "\\'")
    //     .replace(/"/g, "\\\"");
    const result = xss(jsonString, {
        stripIgnoreTagBody: ["script"],
        escapeHtml: function (html) {
            return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
    });
    return decodeJson(result);
};
