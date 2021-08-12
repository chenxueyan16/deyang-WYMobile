if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../uview-ui/components/u-form/u-form?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-icon/u-icon?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-form-item/u-form-item?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-input/u-input?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-loading/u-loading?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-toast/u-toast?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-badge/u-badge?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-tabbar/u-tabbar?hash=1f0769d8bdc5e55ca3bb243570f88f43aabe4427');
require('../../uview-ui/components/u-mask/u-mask?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-popup/u-popup?hash=93778e59e9c142492cad72fd41ad6441b3624d39');
require('../../uview-ui/components/u-action-sheet/u-action-sheet?hash=3c9f7133bdf7d16fec3ef0aaab0556f4e1889c01');
require('../../uview-ui/components/u-swiper/u-swiper?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-grid/u-grid?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-grid-item/u-grid-item?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-image/u-image?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-row/u-row?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../uview-ui/components/u-col/u-col?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../uview-ui/components/u-navbar/u-navbar?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-line-progress/u-line-progress?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-upload/u-upload?hash=c9182effdba6369eafb9bd43b375d039f5423b3b');
require('../../uview-ui/components/u-select/u-select?hash=3c9f7133bdf7d16fec3ef0aaab0556f4e1889c01');
require('../../uview-ui/components/u-cell-group/u-cell-group?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-cell-item/u-cell-item?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-empty/u-empty?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-count-down/u-count-down?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-tabs/u-tabs?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-search/u-search?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-button/u-button?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../uview-ui/components/u-table/u-table?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-tr/u-tr?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-th/u-th?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-td/u-td?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-parse/libs/trees?hash=e8f483ad5a871b6c5d4bc3e44952d9f4da69faaf');
require('../../uview-ui/components/u-parse/u-parse?hash=e8f483ad5a871b6c5d4bc3e44952d9f4da69faaf');
require('../../uview-ui/components/u-card/u-card?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-switch/u-switch?hash=cda091d6f71ff04d2859dead43cb5ecfcb827c82');
require('../../uview-ui/components/u-calendar/u-calendar?hash=f2cfab806be710db0a163c799e0d9ef48fe833f9');
require('../../uview-ui/components/u-tag/u-tag?hash=cf3366fbb6f8f5d580f2256f66f7bbc6e70278a2');
require('../../uview-ui/components/u-swipe-action/u-swipe-action?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uview-ui/components/u-loadmore/u-loadmore?hash=cda091d6f71ff04d2859dead43cb5ecfcb827c82');
require('../../pages/login/login?hash=2c77f893a5ea20ab42de403a8b1b942716c33335');
require('../../pages/index/index?hash=9f8b0eed2966bc97d8341c250e7f24bd5b5e165a');
require('../../pages/home/home?hash=a0179cf0af9dfde930fc2c533c4f2e52b27a2444');
require('../../pages/mine/mine?hash=7ba0e907920c5da0443bb04902cf4d17b22d91cf');
require('../../pages/myself/myself?hash=e9e05e66d9bc4c1a38e96f2e86c08fcb22de5f62');
require('../../pages/about/about?hash=d922ff9824a5dda3f8db1313c321ffc95a3de033');
require('../../pages/vote/vote?hash=b22a2685f9a4e15762e0bd98605385afc13faa2c');
require('../../pages/phone/phone?hash=5f80368ed87eaf505aecb7f2c55af997c586ebf3');
require('../../pages/infocheck/infocheck?hash=9ceef03f26d4df1efa1d9e9a7b687e5f77d38ac1');
require('../../pages/infocheck_detail/infocheck_detail?hash=610c94b477bc02ee1691b2e8d9501713815a234a');
require('../../pages/prevention_detail/prevention_detail?hash=28151ec8321774953f071598fa41ea6f1ef570b7');
require('../../pages/prevention/prevention?hash=56a10159edc3fd94092ae8a30491d8005e800527');
require('../../pages/committee/committee?hash=dcc8987fb7aac929fa2166c298deb2c4b3f9cbe9');
require('../../pages/committee_detail/committee_detail?hash=099b1b8039532f1773060ed278b8027b2e37c243');
require('../../pages/notification/notification?hash=12b213e07265a2d4ae5c065ce851d921a8d3182b');
require('../../pages/notification_list/notification_list?hash=23781d682405d04bbcbe1898df6f0e87aa1e1ba0');
require('../../pages/notification_detail/notification_detail?hash=099b1b8039532f1773060ed278b8027b2e37c243');
require('../../pages/complaint/complaint?hash=abe47836df9a4182ad9e1a21d6d24a322d17de0b');
require('../../pages/complaint_detail/complaint_detail?hash=e8530cb85eb26ffa2385d4b318caa05159f94086');
require('../../pages/vote_detail/vote_detail?hash=6edc5f4089e8b013066eeaa05504a0e91b890b46');
require('../../pages/vote_info/vote_info?hash=8bf99027de53a7c4d5f93e48e58b50fe693046fa');
require('../../pages/infoselect/infoselect?hash=d0c03fbe494eb0f7e25a76bfe54658cb5cfcd925');
require('../../pages/rentcheck/rentcheck?hash=077a5394af54029251aeacf51b40e16edba0bc2c');
require('../../pages/rentcheck_detail/rentcheck_detail?hash=91a165c4fef3aa87e8c8416dd588ea1185b2a950');
require('../../pages/leader/leader?hash=36229058f2f9a6786deb4822380b3ac6f224fb0d');
require('../../pages/community/community?hash=abe47836df9a4182ad9e1a21d6d24a322d17de0b');
require('../../pages/community_detail/community_detail?hash=b1de847ab97174f646b2091eafce57e9f4ba72c5');
require('../../pages/employee/employee?hash=43d959a880cdc47999a5535846036f39b197c833');
require('../../pages/employee_detail/employee_detail?hash=ce254b97ef244943500529055bc306d22e44baef');
require('../../pages/employee_edit/employee_edit?hash=26d6086d766bf0aa23dc0b08eb741feace2a0e44');
require('../../pages/service/service?hash=e256e44bce96de6af3dbda101bb624ac6f9ceb1e');
require('../../pages/service_detail/service_detail?hash=cf87f11abebd5b2995bf54db7d383fd30c86f73a');
require('../../pages/scheduling/scheduling?hash=33db4a2cbe5cf334bfe0abfffb1249fc22fbc484');
require('../../pages/scheduling_detail/scheduling_detail?hash=33db4a2cbe5cf334bfe0abfffb1249fc22fbc484');
require('../../pages/equipment/equipment?hash=64556b717bce40ac4700b9160ff5a460ca5ae7ca');
require('../../pages/warn/warn?hash=abe47836df9a4182ad9e1a21d6d24a322d17de0b');
require('../../pages/warn_detail/warn_detail?hash=c60833edeb0ca0f140c0b318078a3db0ee7ee2ac');
require('../../pages/vehicle/vehicle?hash=49c00f23b56ffa73b6caa29958503464804b5bee');
require('../../pages/vehicle_list/vehicle_list?hash=7491dad66b69b4dcbb399b2331ebf14c4ee71bf3');
require('../../pages/vehicle_detail/vehicle_detail?hash=12226314f53e3dcc4432aee12d417e1e5ca10e8f');
require('../../pages/parking/parking?hash=36229058f2f9a6786deb4822380b3ac6f224fb0d');
require('../../pages/parking_list/parking_list?hash=2c6154368d5355149aff7a803e8e4b202af3df07');
require('../../pages/parking_detail/parking_detail?hash=9820732830d5627449e5106ede9a30657846cbb1');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}