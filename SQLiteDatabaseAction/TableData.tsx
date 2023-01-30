export const tableData = [
  {
    name: 'SERVICE',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: true,
      },
      {
        name: 'serviceId',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'priority',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'service_type',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'item_code',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'item_description',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'customer',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'customer_address',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'contact_name',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'contact_no',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'subject',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'handle_by',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'secretary',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'assistance',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'start_date',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'end_date',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'created_by',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'Approve_status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'Attend_status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'CreateAt',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'Syncstatus',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'itemID',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'customerID',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },

    ],
  },
  {
    name: 'SERVICE_INFO',
    columns: [
      {
        name: 'serviceId',
        dataType: 'TEXT',
        isPrimaryKey: true,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'content',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'plannedToStart',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'plannedToEnd',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'createdBy',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'remarks',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'itemCode',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'mFRSerialNo',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'itemDescription',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'itemGroup',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      }
    ],
  },
  {
    name: 'SERVICE_HISTORY',
    columns: [
      {
        name: 'historyId',
        dataType: 'TEXT',
        isPrimaryKey: true,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'serviceId',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'description',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'ticketType',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'date',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      }
    ],
  },
  {
    name: 'TICKET',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'ticketId',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'serviceId',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'startDate',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'endDate',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'itemDescription',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'content',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'assignTo',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'priority',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'attend_status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'engRemark',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'cusNic',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'cusRemark',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'signatureStatus',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'syncStatus',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'actualstartDate',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
      {
        name: 'actualendtDate',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: true,
      },
    ]
  },

  // engRemark,cusNic,cusRemark,signatureStatus
  {
    name: 'TICKET_SPARE_PARTS',
    columns: [
      {
        name: 'spId',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'SPRequestID',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'ticketId',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'name',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'description',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'qty',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'approveStatus',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'spType_ID',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'creationdate',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'isSync',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'SERVICE_TYPE',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'typeId',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'typeName',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'description',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'EMPLOYEE',
    columns: [
      {
        name: 'empId',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'f_Name',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'l_Name',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'contactNo',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'address',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'SPARE_PARTS',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'spId',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'SparePartNo',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'description',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'stock_qty',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'Item_Group',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'department',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'BrandName',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'LOGIN',
    columns: [
      {
        name: 'loginId',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'userID',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'date',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'EXPENCES',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'ServiceCall_ID',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'ExpenseTypeID',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'Amount',
        dataType: 'DOUBLE',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'Remark',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'CreatedBy',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'CreateDate',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'RelaventDate',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'METER_READING',
    columns: [
      {
        name: 'mrId',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'empID',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'readingType',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'date',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'location',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'value',
        dataType: 'DOUBLE',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'remark',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'EXPENCES_TYPE',
    columns: [
      {
        name: 'expTypeId',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'name',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'description',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'ITEM',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'itemID',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'itemCode',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'description',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'CUSTOMER',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'CusID',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'CusCode',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'CusName',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'Address',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'User_Type',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'type_id',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'description',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'User',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'NIC',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'user_id',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'userTypeId',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'name',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'mobile_number',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'email',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'Resources',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'ResourcesID',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'Decription',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'R_Type',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'Type',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },

  {
    name: 'RESOURCE_REQUEST',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'RequestID',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'ResourceID',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'ServiceCall_id',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'RequestDate',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'HandoverDate',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'CreatedDate',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'Remark',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
    ]
  },
  {
    name: 'PRIORITY_LIST',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'Id',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'name',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },

    ]
  },
  {
    name: 'USER_TYPES',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'Id',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'name',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'description',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'type_name',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'type_id',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },

    ]
  },
  {
    name: 'Contact_Person',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'Id',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'name',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'description',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },

    ]
  },
  {
    name: 'Customer_Items',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'ItemId',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'ItemCode',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'ItemName',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'Customer',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'CustomerName',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },

    ]
  },
  {
    name: 'Item_serialNO',
    columns: [
      {
        name: '_Id',
        dataType: 'INTEGER',
        isPrimaryKey: true,
        autoIncrement: true,
        shouldNotAllowNull: false,
      },
      {
        name: 'ItemId',
        dataType: 'INTEGER',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'ItemCode',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'ItemName',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'msnfSN',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'InternalSN',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },
      {
        name: 'status',
        dataType: 'TEXT',
        isPrimaryKey: false,
        autoIncrement: false,
        shouldNotAllowNull: false,
      },

    ]
  },
]