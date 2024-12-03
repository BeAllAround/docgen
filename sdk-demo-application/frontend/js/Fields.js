const TrelloFields = {
  board: {
    post: {
      closed: {
        // required but NOT indicated by the SWAGGER
        type: 'string',
        values: ['true', 'false'],
      },
      desc: {
        type: 'string',
        length: {
          min: 0,
          max: 16384,
        },
      },
      idBoardSource: {
        type: 'string',
        description: 'The id of the board to copy into the new board',
      },
      idOrganization: {
        type: 'string',
        description: 'The id or name of the organization to add the board to',
      },
      keepFromSource: {
        type: 'string',
        description: 'Components of the source board to copy',
      },
      labelNames: {
        blue: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
        green: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
        orange: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
        purple: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
        red: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
        yellow: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
      },
      name: {
        type: 'string',
        length: {
          min: 1,
          max: 16384,
        },
      },
      powerUps: {
        type: 'string',
        values: ['all', 'calendar', 'cardAging', 'recap', 'voting'],
      },
      prefs: {
        background: {
          type: 'string',
          description: 'A standard background name, or the id of a custom background',
        },
        calendarFeedEnabled: {
          type: 'string',
          values: ['true', 'false'],
        },
        cardAging: {
          type: 'string',
          values: ['pirate', 'regular'],
        },
        cardCovers: {
          type: 'string',
          values: ['true', 'false'],
        },
        comments: {
          type: 'string',
          values: ['disabled', 'members', 'observers', 'org', 'public'],
        },
        invitations: {
          type: 'string',
          values: ['admins', 'members'],
        },
        permissionLevel: {
          type: 'string',
          values: ['org', 'private', 'public'],
        },
        selfJoin: {
          type: 'string',
          values: ['true', 'false'],
        },
        voting: {
          type: 'string',
          values: ['disabled', 'members', 'observers', 'org', 'public'],
        },
      },
      prefs_background: {
        type: 'string',
        length: {
          min: 0,
          max: 16384,
        },
      },
      prefs_cardAging: {
        type: 'string',
        values: ['pirate', 'regular'],
      },
      prefs_cardCovers: {
        type: 'string',
        values: ['true', 'false'],
      },
      prefs_comments: {
        type: 'string',
        values: ['disabled', 'members', 'observers', 'org', 'public'],
      },
      prefs_invitations: {
        type: 'string',
        values: ['admins', 'members'],
      },
      prefs_permissionLevel: {
        type: 'string',
        values: ['org', 'private', 'public'],
      },
      prefs_selfJoin: {
        type: 'string',
        values: ['true', 'false'],
      },
      prefs_voting: {
        type: 'string',
        values: ['disabled', 'members', 'observers', 'org', 'public'],
      },
      subscribed: {
        type: 'string',
        values: ['true', 'false'],
      },
    },
    put: {
      closed: {
        // required but NOT indicated by the SWAGGER
        type: 'string',
        values: ['true', 'false'],
      },
      desc: {
        type: 'string',
        length: {
          min: 0,
          max: 16384,
        },
      },
      idBoardSource: {
        type: 'string',
        description: 'The id of the board to copy into the new board',
      },
      idOrganization: {
        type: 'string',
        description: 'The id or name of the organization to add the board to',
      },
      keepFromSource: {
        type: 'string',
        description: 'Components of the source board to copy',
      },
      labelNames: {
        blue: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
        green: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
        orange: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
        purple: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
        red: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
        yellow: {
          type: 'string',
          length: {
            min: 0,
            max: 16384,
          },
        },
      },
      name: {
        type: 'string',
        length: {
          min: 1,
          max: 16384,
        },
      },
      powerUps: {
        type: 'string',
        values: ['all', 'calendar', 'cardAging', 'recap', 'voting'],
      },
      prefs: {
        background: {
          type: 'string',
          description: 'A standard background name, or the id of a custom background',
        },
        calendarFeedEnabled: {
          type: 'string',
          values: ['true', 'false'],
        },
        cardAging: {
          type: 'string',
          values: ['pirate', 'regular'],
        },
        cardCovers: {
          type: 'string',
          values: ['true', 'false'],
        },
        comments: {
          type: 'string',
          values: ['disabled', 'members', 'observers', 'org', 'public'],
        },
        invitations: {
          type: 'string',
          values: ['admins', 'members'],
        },
        permissionLevel: {
          type: 'string',
          values: ['org', 'private', 'public'],
        },
        selfJoin: {
          type: 'string',
          values: ['true', 'false'],
        },
        voting: {
          type: 'string',
          values: ['disabled', 'members', 'observers', 'org', 'public'],
        },
      },
      prefs_background: {
        type: 'string',
        length: {
          min: 0,
          max: 16384,
        },
      },
      prefs_cardAging: {
        type: 'string',
        values: ['pirate', 'regular'],
      },
      prefs_cardCovers: {
        type: 'string',
        values: ['true', 'false'],
      },
      prefs_comments: {
        type: 'string',
        values: ['disabled', 'members', 'observers', 'org', 'public'],
      },
      prefs_invitations: {
        type: 'string',
        values: ['admins', 'members'],
      },
      prefs_permissionLevel: {
        type: 'string',
        values: ['org', 'private', 'public'],
      },
      prefs_selfJoin: {
        type: 'string',
        values: ['true', 'false'],
      },
      prefs_voting: {
        type: 'string',
        values: ['disabled', 'members', 'observers', 'org', 'public'],
      },
      subscribed: {
        type: 'string',
        values: ['true', 'false'],
      },
    },
  },

  list: {
    post: {
      closed: {
        type: 'string',
        values: ['true', 'false'],
      },
      idBoard: {
        type: 'string',
        description: 'id of the board that the list should be added to',
      },
      idListSource: {
        type: 'string',
        description: 'The id of the list to copy into a new list',
      },
      name: {
        type: 'string',
        length: {
          min: 1,
          max: 16384,
        },
      },
      pos: {
        type: 'string',
        values: ['top', 'bottom'],
        description: 'A position. \'top\', \'bottom\', or a positive number',
      },
      subscribed: {
        type: 'string',
        values: ['true', 'false'],
      },
    },
    put: {
      closed: {
        type: 'string',
        values: ['true', 'false'],
      },
      idBoard: {
        type: 'string',
        description: 'id of the board that the list should be added to',
      },
      idListSource: {
        type: 'string',
        description: 'The id of the list to copy into a new list',
      },
      name: {
        type: 'string',
        length: {
          min: 1,
          max: 16384,
        },
      },
      pos: {
        type: 'string',
        values: ['top', 'bottom'],
        description: 'A position. \'top\', \'bottom\', or a positive number',
      },
      subscribed: {
        type: 'string',
        values: ['true', 'false'],
      },
    },
  },
};

const SailhouseFields = {
  subscription: {
    put: {},
    post: {
      data: {
        type: 'object',
        description: 'Event data payload',
      },
      metadata: {
        type: 'object',
        description: 'Metadata of the event',
      },
    },
  },
  topic: {
    put: {},
    post: {
      data: {
        type: 'object',
        description: 'Event data payload',
      },
      metadata: {
        type: 'object',
        description: 'Metadata of the event',
      },
    },
  },
};

// Export the object
export { TrelloFields, SailhouseFields };
