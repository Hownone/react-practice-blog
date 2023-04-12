import { makeAutoObservable } from 'mobx';
import { http } from '@/utils';
class ChannelStore {
    channelList = [];
    constructor() {
        makeAutoObservable(this);
    }

    //article 与 publish中都需要调用这个函数，那么就在他们的公共组件layout中调用
    loadChannelList = async () => {
        const res = await http.get('/channels');
        this.channelList = res.data.channels;
    }
}

export default ChannelStore;
