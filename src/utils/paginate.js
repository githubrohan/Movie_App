import _ from 'lodash';

export function paginate(items,pageMumber,pageSize){
    const startIndex = (pageMumber-1)*pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
}