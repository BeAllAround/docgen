const SailhouseEntities = [
  {
    name: 'subscription',
    title: 'Subscription',
    op: {
      create: {
        query: {
          topic: {
            type: String,
            default: 'example-topic1',
          },
        },
      },
      list: {
        query: {
          topic: {
            type: String,
            default: 'example-topic1',
          },
          subscription: {
            type: String,
            default: 'test',
          },
        },
      },
    },
    // Dynamically resolve formFields when accessed
    get formFields() {
      const editables = window[SDK_NAME]?.fields?.editables['subscription']?.post;
      return editables ? Object.keys(editables) : [];
    },
  },
  {
    name: 'topic',
    title: 'Topics',
    op: {
      create: {
        query: {
          topic: {
            type: String,
            default: 'example-topic1',
          },
        },
      },
      list: {
        query: {
          topic: {
            type: String,
            default: 'example-topic1',
          },
          subscription: {
            type: String,
            default: 'test',
          },
        },
      },
    },
    // Dynamically resolve formFields when accessed
    get formFields() {
      const editables = window[SDK_NAME]?.fields?.editables['topic']?.post;
      return editables ? Object.keys(editables) : [];
    },
  },
];

const TrelloEntities = [
  {
    name: 'board',
    title: 'Board', // just capitalized

    // TODO: Transform from model
    op: {
      save: {},
      create: {},
      list: {
        query: {
          idMember: {
            type: String,
            // HARDCODED - make a query button/form
            default: 'me',
          },
        },
      },
      remove: {},
    },

    // TODO: Transform from model
    get formFields() {
      const editables = window[SDK_NAME]?.fields?.editables['board']?.post;
      return editables ? Object.keys(editables) : [];
    },
  },
  {
    name: 'list',
    title: 'List',

    // TODO: Transform from model
    op: {
      save: {},
      create: {},
      list: {
        query: {
          idBoard: {
            type: String,
            // HARDCODED - make a query button/form
            default: '6735f4225f8fbbd10bba2da0',
          },
        },
      },
      // If not found here, it is considered "UNSUPPORTED"
      // remove: {}
    },

    get formFields() {
      const editables = window[SDK_NAME]?.fields?.editables['list']?.post;
      return editables ? Object.keys(editables) : [];
    },
  },
];

export { SailhouseEntities, TrelloEntities };
