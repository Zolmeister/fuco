var levelIndex = 7
var cy = -RADIUS * 1.5
var levels = [
  [ // 1
    {
      color: new Color(86,119,252),
      path: function (ctx) {
        ctx.arc(0, cy, RADIUS, 0, TAO)
      }
    }
  ],
  [ // 2
    {
      color: new Color(86,119,252),
      path: function (ctx) {
        ctx.arc(0, cy, RADIUS, PI / 2, PI + PI / 2)
      }
    },
    {
      color: new Color(145,167,255),
      path: function (ctx) {
        ctx.arc(0, cy, RADIUS, PI + PI / 2, TAO + PI / 2)
      }
    }
  ],
  [ // 3
    {
      color: new Color(42,54,177),
      path: function (ctx) {
        var a1 = TAO / 3
        var a2 = TAO / 3 * 2
        var x = RADIUS * Math.cos(a1)
        var y = cy + RADIUS * Math.sin(a1)

        ctx.lineTo(x, y)
        ctx.arc(0, cy, RADIUS, a1, a2)
        ctx.lineTo(0, cy)
      }
    },
    {
      color: new Color(86,119,252),
      path: function (ctx) {
        var a1 = 0
        var a2 = TAO / 3
        var x = RADIUS * Math.cos(a1)
        var y = cy + RADIUS * Math.sin(a1)

        ctx.lineTo(x, y)
        ctx.arc(0, cy, RADIUS, a1, a2)
        ctx.lineTo(0, cy)
      }
    },
    {
      color: new Color(145,167,255),
      path: function (ctx) {
        var a1 = TAO / 3 * 2
        var a2 = TAO
        var x = RADIUS * Math.cos(a1)
        var y = cy + RADIUS * Math.sin(a1)

        ctx.lineTo(x, y)
        ctx.arc(0, cy, RADIUS, a1, a2)
        ctx.lineTo(0, cy)
      }
    }
  ],
  [ // 4
    {
      color: new Color(42,54,177),
      path: function (ctx) {
        var a1 = TAO / 4
        var a2 = TAO / 4 * 2
        var x = RADIUS * Math.cos(a1)
        var y = cy + RADIUS * Math.sin(a1)

        ctx.lineTo(x, y)
        ctx.arc(0, cy, RADIUS, a1, a2)
        ctx.lineTo(0, cy)
      }
    },
    {
      color: new Color(86,119,252),
      path: function (ctx) {
        var a1 = TAO / 4 * 2
        var a2 = TAO / 4 * 3
        var x = RADIUS * Math.cos(a1)
        var y = cy + RADIUS * Math.sin(a1)

        ctx.lineTo(x, y)
        ctx.arc(0, cy, RADIUS, a1, a2)
        ctx.lineTo(0, cy)
      }
    },
    {
      color: new Color(145,167,255),
      path: function (ctx) {
        var a1 = 0
        var a2 = TAO / 4
        var x = RADIUS * Math.cos(a1)
        var y = cy + RADIUS * Math.sin(a1)

        ctx.lineTo(x, y)
        ctx.arc(0, cy, RADIUS, a1, a2)
        ctx.lineTo(0, cy)
      }
    },
    {
      color: new Color(255,152,0),
      path: function (ctx) {
        var a1 = TAO / 4 * 3
        var a2 = TAO
        var x = RADIUS * Math.cos(a1)
        var y = cy + RADIUS * Math.sin(a1)

        ctx.lineTo(x, y)
        ctx.arc(0, cy, RADIUS, a1, a2)
        ctx.lineTo(0, cy)
      }
    }
  ],
  [ // 5
    {
      color: new Color(42,54,177),
      path: function (ctx) {
        var a1 = PI / 2 + PI / 6
        var a2 = -PI / 2 - PI / 6
        var x = RADIUS * Math.cos(a1)
        var y = cy + RADIUS * Math.sin(a1)
        ctx.moveTo(x, y)
        ctx.arc(0, cy, RADIUS, a1, a2)

      }
    },
    {
      color: new Color(255,204,128),
      path: function (ctx) {
        var a1 = -PI / 2
        var a2 = -PI / 2 - PI / 6
        var x = RADIUS * Math.cos(a1)
        var y = cy + RADIUS * Math.sin(a1)
        ctx.moveTo(x, y)
        ctx.arc(0, cy, RADIUS, a1, a2, true)

        var a3 = PI / 2 + PI / 6
        var a4 = PI / 2
        ctx.arc(0, cy, RADIUS, a3, a4, true)

      }
    },
    {
      color: new Color(255,152,0),
      path: function (ctx) {
        var a1 = -PI / 2
        var a2 = -PI / 2 + PI / 6
        var x = RADIUS * Math.cos(a1)
        var y = cy + RADIUS * Math.sin(a1)
        ctx.moveTo(x, y)
        ctx.arc(0, cy, RADIUS, a1, a2)

        var a3 = PI / 2 - PI / 6
        var a4 = PI / 2
        ctx.arc(0, cy, RADIUS, a3, a4)

      }
    },
    {
      color: new Color(86,119,252),
      path: function (ctx) {
        var a1 = -PI / 2 + PI / 6
        var a2 = PI / 2 - PI / 6
        var x = RADIUS * Math.cos(a1)
        var y = cy + RADIUS * Math.sin(a1)
        ctx.moveTo(x, y)
        ctx.arc(0, cy, RADIUS, a1, a2)

      }
    }
  ],
  [ // 7
    {
      color: new Color(255,152,0),
      path: function (ctx) {
        ctx.arc(0, cy, RADIUS, 0, TAO)
        ctx.arc(0, cy, RADIUS / 2, 0, TAO, true)
      }
    },
    {
      color: new Color(37,155,36),
      path: function (ctx) {
        ctx.arc(0, cy, RADIUS / 2, 0, TAO)
      }
    }
  ],
  [ // 8
    {
      color: new Color(255,152,0),
      path: function (ctx) {
        ctx.arc(0, cy, RADIUS, 0, TAO)
        ctx.arc(0, cy, RADIUS / 3 * 2, 0, TAO, true)
      }
    },
    {
      color: new Color(37,155,36),
      path: function (ctx) {
        ctx.arc(0, cy, RADIUS / 3 * 2, 0, TAO)
        ctx.arc(0, cy, RADIUS / 3, 0, TAO, true)
      }
    },
    {
      color: new Color(114,213,114),
      path: function (ctx) {
        ctx.arc(0, cy, RADIUS / 3, 0, TAO)
      }
    }
  ],
  [ // 9
    {
      color: new Color(0,102,255),
      path: function (ctx) {
        var thick = 36
        var width = 20
        var size = 66
        var length = 60
        //   |-> -> ->|
        //   |<- <- <-|
        //          //
        //        //
        //     //
        //   |-> -> ->|
        //   |<- <- <-|


        //   -> -> ->|
        //           |
        ctx.moveTo(-length, cy - size)
        ctx.lineTo(length, cy - size)
        ctx.lineTo(length, cy - thick)

        //          /
        //        /
        //     /
        ctx.lineTo(-width, cy + thick)

        //   -> -> ->|
        //           |
        ctx.lineTo(length, cy + thick)
        ctx.lineTo(length, cy + size)

        //   |
        //   |<- <- <-|
        ctx.lineTo(-length, cy + size)
        ctx.lineTo(-length, cy + thick)

        //          /
        //        /
        //     /
        ctx.lineTo(width, cy - thick)

        //   |
        //   |<- <- <-|
        ctx.lineTo(-length, cy - thick)
        ctx.lineTo(-length, cy - size)
      }
    },
    {
      color: new Color(0,0,0),
      path: function (ctx) {
        ctx.arc(0, cy, RADIUS, 0, TAO)
      }
    }
  ]
]
