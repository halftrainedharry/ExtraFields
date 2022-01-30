ExtraFields.getXtype = function (field) {

    let xtype = {
        xtype: field.xtype,
        fieldLabel: field.label,
        name: field.name,
        id: 'modx-extrafields-' + field.name,
        anchor: '99%',
        allowBlank: !field.required,
    };

    switch (field.xtype) {
        case 'richtext':
            xtype.xtype = 'textarea';
            xtype.listeners = {
                render: function (el) {
                    if (MODx.loadRTE) {
                        window.setTimeout(function() {
                            MODx.loadRTE(el.id);
                        }, 300);
                    }
                }
            }
            break;

        case 'xcheckbox':
            xtype.fieldLabel = '';
            xtype.boxLabel = field.label;
            break;

        case 'combo-boolean':
            xtype.hiddenName = field.name;
            xtype.store =  new Ext.data.SimpleStore({
                fields: ["d", "v"],
                data: [[_("yes"), 1], [_("no"), 0]]
            });
            break;

        case 'datefield':
            xtype.format = MODx.config.manager_date_format;
            break;

        case 'timefield':
            xtype.format = MODx.config.manager_time_format;
            break;

        case 'xdatetime':
            xtype.dateFormat =  MODx.config.manager_date_format;
            xtype.timeFormat =  MODx.config.manager_time_format;
            break;

        case 'readonly':
            xtype.xtype = 'textfield';
            xtype.readOnly = true;
            break;

    }

    return xtype;
};