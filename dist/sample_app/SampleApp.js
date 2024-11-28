"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleApp = void 0;
const jostraca_1 = require("jostraca");
const Server_1 = require("./Server");
const SampleApp = (0, jostraca_1.cmp)(function SampleApp(props) {
    const { ctx$ } = props;
    const { model } = ctx$;
    (0, jostraca_1.Folder)({ name: 'sampleapp' }, () => {
        (0, Server_1.Server)(props);
    });
});
exports.SampleApp = SampleApp;
//# sourceMappingURL=SampleApp.js.map