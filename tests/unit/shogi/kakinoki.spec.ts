import {
  Color,
  exportKakinoki,
  importKakinoki,
  Move,
  Piece,
  PieceType,
  Record,
  RecordMetadataKey,
  SpecialMove,
  Square,
} from "@/shogi";

describe("shogi/kakinoki", () => {
  it("import/standard", () => {
    const data = `
# ----  Kifu for Windows V7 V7.50 棋譜ファイル  ----
手合割：平手　　
先手：奨励会員
後手：久保
手数----指手---------消費時間--
   1 ２六歩(27)   ( 0:00/00:00:00)
   2 ８四歩(83)   ( 0:00/00:00:00)
   3 ７六歩(77)   ( 0:00/00:00:00)
   4 ８五歩(84)   ( 0:00/00:00:00)
   5 ７七角(88)   ( 0:00/00:00:00)
   6 ３二金(41)   ( 0:00/00:00:00)
   7 ６八銀(79)   ( 0:00/00:00:00)
   8 ３四歩(33)   ( 0:00/00:00:00)
   9 ７八金(69)   ( 0:00/00:00:00)
  10 ４二銀(31)   ( 0:00/00:00:00)
  11 ４八銀(39)   ( 0:00/00:00:00)
  12 ６二銀(71)   ( 0:00/00:00:00)
  13 ４六歩(47)   ( 0:00/00:00:00)
  14 ６四歩(63)   ( 0:00/00:00:00)
  15 ４七銀(48)   ( 0:00/00:00:00)
  16 ６三銀(62)   ( 0:00/00:00:00)
  17 ２二角成(77) ( 0:00/00:00:00)
  18 同　金(32)   ( 0:00/00:00:00)
  19 ７七銀(68)   ( 0:00/00:00:00)
  20 ４四歩(43)   ( 0:00/00:00:00)
  21 ９六歩(97)   ( 0:00/00:00:00)
  22 ９四歩(93)   ( 0:00/00:00:00)
  23 ３六歩(37)   ( 0:00/00:00:00)
  24 ４三銀(42)   ( 0:00/00:00:00)
  25 ３七桂(29)   ( 0:00/00:00:00)
  26 ５二金(61)   ( 0:00/00:00:00)
  27 ４八金(49)   ( 0:00/00:00:00)
  28 ７四歩(73)   ( 0:00/00:00:00)
  29 ６六歩(67)   ( 0:00/00:00:00)
  30 ７三桂(81)   ( 0:00/00:00:00)
  31 ２九飛(28)   ( 0:00/00:00:00)
  32 ８一飛(82)   ( 0:00/00:00:00)
  33 ６八銀(77)   ( 0:00/00:00:00)
  34 ４二玉(51)   ( 0:00/00:00:00)
  35 ６七銀(68)   ( 0:00/00:00:00)
  36 ８六歩(85)   ( 0:00/00:00:00)
  37 同　歩(87)   ( 0:00/00:00:00)
  38 同　飛(81)   ( 0:00/00:00:00)
  39 ８七歩打     ( 0:00/00:00:00)
  40 ８一飛(86)   ( 0:00/00:00:00)
  41 ４九玉(59)   ( 0:00/00:00:00)
  42 １四歩(13)   ( 0:00/00:00:00)
  43 ３八玉(49)   ( 0:00/00:00:00)
  44 １五歩(14)   ( 0:00/00:00:00)
  45 ５六銀(67)   ( 0:00/00:00:00)
  46 ３二金(22)   ( 0:00/00:00:00)
  47 ６九飛(29)   ( 0:00/00:00:00)
  48 ３一玉(42)   ( 0:00/00:00:00)
  49 ７七桂(89)   ( 0:00/00:00:00)
  50 ５四銀(43)   ( 0:00/00:00:00)
  51 ６五歩(66)   ( 0:00/00:00:00)
  52 同　桂(73)   ( 0:00/00:00:00)
  53 同　桂(77)   ( 0:00/00:00:00)
  54 同　歩(64)   ( 0:00/00:00:00)
  55 ４五歩(46)   ( 0:00/00:00:00)
  56 ７三角打     ( 0:00/00:00:00)
  57 ６五銀(56)   ( 0:00/00:00:00)
  58 同　銀(54)   ( 0:00/00:00:00)
  59 同　飛(69)   ( 0:00/00:00:00)
  60 ５四銀(63)   ( 0:00/00:00:00)
  61 ７二角打     ( 0:00/00:00:00)
  62 ６五銀(54)   ( 0:00/00:00:00)
  63 ８一角成(72) ( 0:00/00:00:00)
  64 ２二玉(31)   ( 0:00/00:00:00)
*4六桂の方が良かった。
  65 ４一銀打     ( 0:00/00:00:00)
  66 ６九飛打     ( 0:00/00:00:00)
  67 ７九飛打     ( 0:00/00:00:00)
  68 ２九銀打     ( 0:00/00:00:00)
  69 ２八玉(38)   ( 0:00/00:00:00)
  70 ７九飛成(69) ( 0:00/00:00:00)
  71 同　金(78)   ( 0:00/00:00:00)
  72 １六歩(15)   ( 0:00/00:00:00)
  73 ２九玉(28)   ( 0:00/00:00:00)
  74 １七歩成(16) ( 0:00/00:00:00)
  75 同　香(19)   ( 0:00/00:00:00)
  76 同　香成(11) ( 0:00/00:00:00)
  77 １四桂打     ( 0:00/00:00:00)
  78 ３三玉(22)   ( 0:00/00:00:00)
  79 ３二銀成(41) ( 0:00/00:00:00)
  80 同　玉(33)   ( 0:00/00:00:00)
  81 １二飛打     ( 0:00/00:00:00)
  82 ４一玉(32)   ( 0:00/00:00:00)
  83 ３一金打     ( 0:00/00:00:00)
  84 ５一玉(41)   ( 0:00/00:00:00)
  85 ５二飛成(12) ( 0:00/00:00:00)
  86 同　玉(51)   ( 0:00/00:00:00)
  87 ４一銀打     ( 0:00/00:00:00)
  88 ４三玉(52)   ( 0:00/00:00:00)
  89 ４四歩(45)   ( 0:00/00:00:00)
  90 ３三玉(43)   ( 0:00/00:00:00)
  91 ３二銀成(41) ( 0:00/00:00:00)
  92 ２四玉(33)   ( 0:00/00:00:00)
  93 ２五金打     ( 0:00/00:00:00)
  94 １三玉(24)   ( 0:00/00:00:00)
`;
    const record = importKakinoki(data) as Record;
    expect(record).toBeInstanceOf(Record);
    expect(
      record.metadata.getStandardMetadata(RecordMetadataKey.BLACK_NAME)
    ).toBe("奨励会員");
    expect(
      record.metadata.getStandardMetadata(RecordMetadataKey.WHITE_NAME)
    ).toBe("久保");
    expect(record.current.comment).toBe("");
    record.goto(64);
    expect(record.current.comment).toBe("4六桂の方が良かった。");
    expect(record.sfen).toBe(
      "l+B5nl/4g1gk1/2b1p2p1/p1p2pp2/3s1P2p/P1P3PP1/1P2PSN1P/2G2GK2/L7L b RSNPrsn2p 65"
    );
    record.goto(999);
    expect(record.current.number).toBe(94);
    expect(record.current.comment).toBe("");
  });

  it("import/handicap", () => {
    const data = `
#KIF version=2.0 encoding=UTF-8
開始日時：2021/10/17
場所：81Dojo
持ち時間：15分+60秒
手合割：角落ち
先手：ZhangJingding
後手：Sota_FUJII
手数----指手---------消費時間--
1   ８四歩(83)   (0:23/0:0:23)
2   ７六歩(77)   (0:29/0:0:29)
3   ８五歩(84)   (0:3/0:0:26)
4   ７七角(88)   (0:2/0:0:31)
5   ６二銀(71)   (0:4/0:0:30)
6   ８八銀(79)   (0:3/0:0:34)
7   ４二玉(51)   (0:8/0:0:38)
8   ２六歩(27)   (0:4/0:0:38)
9   ２二銀(31)   (0:3/0:0:41)
10   ２五歩(26)   (0:7/0:0:45)
11   ３二玉(42)   (0:6/0:0:47)
12   ７八金(69)   (0:4/0:0:49)
13   ７四歩(73)   (0:7/0:0:54)
14   ５八金(49)   (0:3/0:0:52)
15   ５二金(61)   (0:11/0:1:5)
16   ６六歩(67)   (0:5/0:0:57)
17   ６四歩(63)   (0:16/0:1:21)
18   ６七金(58)   (0:4/0:1:1)
19   ６三銀(62)   (0:2/0:1:23)
20   ５六歩(57)   (0:3/0:1:4)
21   ７二飛(82)   (0:19/0:1:42)
22   ６八角(77)   (0:5/0:1:9)
23   ７五歩(74)   (0:3/0:1:45)
24   同　歩(76)   (0:3/0:1:12)
25   同　飛(72)   (0:2/0:1:47)
26   ７六歩打   (0:2/0:1:14)
27   ７四飛(75)   (0:16/0:2:3)
28   ７七銀(88)   (0:4/0:1:18)
29   ４二金(41)   (0:11/0:2:14)
30   ４八銀(39)   (0:2/0:1:20)
31   ３四歩(33)   (0:2/0:2:16)
32   ３六歩(37)   (0:9/0:1:29)
33   ３三銀(22)   (0:3/0:2:19)
34   ６九玉(59)   (0:3/0:1:32)
35   ４四歩(43)   (0:24/0:2:43)
36   ７九玉(69)   (0:6/0:1:38)
37   ７三桂(81)   (0:15/0:2:58)
38   ３七銀(48)   (0:10/0:1:48)
39   ８四飛(74)   (0:4/0:3:2)
40   ２六銀(37)   (0:16/0:2:4)
41   ８一飛(84)   (0:12/0:3:14)
42   ３五歩(36)   (0:17/0:2:21)
43   同　歩(34)   (0:9/0:3:23)
44   同　銀(26)   (0:1/0:2:22)
45   ４三金(42)   (0:3/0:3:26)
46   ２四歩(25)   (0:21/0:2:43)
47   同　歩(23)   (0:4/0:3:30)
48   同　銀(35)   (0:1/0:2:44)
49   同　銀(33)   (0:2/0:3:32)
50   同　角(68)   (0:1/0:2:45)
51   ２三歩打   (0:4/0:3:36)
52   ６八角(24)   (0:4/0:2:49)
53   ５四歩(53)   (0:12/0:3:48)
54   ８八玉(79)   (0:11/0:3:0)
55   ３三金(43)   (0:19/0:4:7)
56   ２五銀打   (0:37/0:3:37)
57   ４三金(52)   (1:3/0:5:10)
58   ３四歩打   (0:38/0:4:15)
59   同　金(43)   (0:5/0:5:15)
60   同　銀(25)   (0:3/0:4:18)
61   同　金(33)   (0:2/0:5:17)
62   ６二金打   (0:6/0:4:24)
63   ５二銀打   (1:56/0:7:13)
64   ５五歩(56)   (0:5/0:4:29)
65   ５三銀打   (0:27/0:7:40)
66   ５二金(62)   (0:19/0:4:48)
67   同　銀(63)   (0:2/0:7:42)
68   ７五歩(76)   (1:33/0:6:21)
69   ６三銀(52)   (0:46/0:8:28)
70   ７四銀打   (0:10/0:6:31)
71   ７二銀(63)   (0:12/0:8:40)
72   ５四歩(55)   (0:21/0:6:52)
73   同　銀(53)   (0:3/0:8:43)
74   ７三銀成(74)   (0:2/0:6:54)
75   同　銀(72)   (0:2/0:8:45)
76   ４六桂打   (0:1/0:6:55)
77   ４五銀打   (2:16/0:11:1)
78   ３四桂(46)   (0:41/0:7:36)
79   同　銀(45)   (0:2/0:11:3)
80   ５三金打   (0:1/0:7:37)
81   ４三金打   (0:16/0:11:19)
82   同　金(53)   (0:30/0:8:7)
83   同　銀(54)   (0:36/0:11:55)
84   ７二金打   (0:2/0:8:9)
85   ８三飛(81)   (0:3/0:11:58)
86   ２四歩打   (0:30/0:8:39)
87   同　歩(23)   (0:47/0:12:45)
88   同　角(68)   (0:2/0:8:41)
89   ３三桂(21)   (0:37/0:13:22)
90   ７三金(72)   (0:41/0:9:22)
91   同　飛(83)   (0:4/0:13:26)
92   ４一銀打   (0:1/0:9:23)
93   ４二玉(32)   (0:13/0:13:39)
94   ４六角(24)   (0:59/0:10:22)
95   ４一玉(42)   (0:29/0:14:8)
96   ６四角(46)   (0:1/0:10:23)
97   ２七歩打   (0:12/0:14:20)
98   同　飛(28)   (0:16/0:10:39)
99   ２六歩打   (0:2/0:14:22)
100   同　飛(27)   (0:9/0:10:48)
101   ２五歩打   (0:1/0:14:23)
102   ５六飛(26)   (0:1/0:10:49)
103   ６三飛(73)   (0:27/0:14:50)
104   ９一角成(64)   (0:21/0:11:10)
105   ７六歩打   (0:7/0:14:57)
106   ６八銀(77)   (0:6/0:11:16)
107   ８六歩(85)   (0:39/0:15:36)
108   同　歩(87)   (0:20/0:11:36)
109   ４五銀(34)   (0:38/0:16:14)
110   ５九飛(56)   (0:12/0:11:48)
111   ４八金打   (0:14/0:16:28)
112   ８一馬(91)   (0:32/0:12:20)
113   ８三飛(63)   (0:22/0:16:50)
114   ７二馬(81)   (0:22/0:12:42)
115   ８六飛(83)   (0:12/0:17:2)
116   ８七歩打   (0:21/0:13:3)
117   ５九金(48)   (0:9/0:17:11)
118   同　銀(68)   (0:9/0:13:12)
119   ９五桂打   (0:40/0:17:51)
120   ８六歩(87)   (0:6/0:13:18)
121   ８七歩打   (0:15/0:18:6)
122   同　金(78)   (0:17/0:13:35)
123   ６九飛打   (0:21/0:18:27)
124   ８一飛打   (0:28/0:14:3)
125   ５一歩打   (0:28/0:18:55)
126   ６八銀(59)   (0:6/0:14:9)
127   ７九銀打   (0:45/0:19:40)
128   同　銀(68)   (0:5/0:14:14)
129   ６七飛成(69)   (0:7/0:19:47)
130   ７八金打   (0:14/0:14:28)
131   ８七桂成(95)   (0:24/0:20:11)
132   同　金(78)   (0:1/0:14:29)
133   ６八金打   (0:25/0:20:36)
134   ６一馬(72)   (1:16/0:15:45)
135   ５八龍(67)   (0:40/0:21:16)
136   ５一馬(61)   (0:43/0:16:28)
137   同　龍(58)   (0:22/0:21:38)
138   同　飛成(81)   (0:3/0:16:31)
139   同　玉(41)   (0:19/0:21:57)
140   ６八銀(79)   (0:1/0:16:32)
141   ２八飛打   (0:28/0:22:25)
142   ５九香打   (0:36/0:17:8)
143   ４一玉(51)   (0:23/0:22:48)
144   ５一飛打   (0:19/0:17:27)
145   ３二玉(41)   (0:16/0:23:4)
146   ７八金打   (0:19/0:17:46)
147   ３五角打   (0:18/0:23:22)
148   ４六桂打   (0:15/0:18:1)
149   ６九金打   (0:40/0:24:2)
150   ５八飛成(51)   (0:34/0:18:35)
151   同　飛成(28)   (0:14/0:24:16)
152   同　香(59)   (0:1/0:18:36)
153   ２八飛打   (0:9/0:24:25)
154   ５九歩打   (0:26/0:19:2)
155   ２九飛成(28)   (0:44/0:25:9)
156   ５三香成(58)   (0:55/0:19:57)
157   ６八金(69)   (0:19/0:25:28)
158   同　金(78)   (0:3/0:20:0)
159   ５九龍(29)   (0:8/0:25:36)
160   ４三成香(53)   (0:10/0:20:10)
161   同　玉(32)   (0:9/0:25:45)
162   ６九金打   (0:2/0:20:12)
163   ５六龍(59)   (0:44/0:26:29)
164   ５三歩打   (0:53/0:21:5)
165   ４六銀(45)   (0:19/0:26:48)
166   同　歩(47)   (0:10/0:21:15)
167   ９五桂打   (0:23/0:27:11)
168   ５二銀打   (0:37/0:21:52)
169   ５三玉(43)   (0:39/0:27:50)
170   ８三飛打   (0:4/0:21:56)
171   ５二玉(53)   (0:14/0:28:4)
172   ４三銀打   (0:9/0:22:5)
173   ６一玉(52)   (0:12/0:28:16)
174   ６三飛成(83)   (0:9/0:22:14)
175   ６二歩打   (0:16/0:28:32)
176   ７二銀打   (0:19/0:22:33)
177   ５一玉(61)   (0:10/0:28:42)
178   投了   (0:11/0:22:44)
`;
    const record = importKakinoki(data) as Record;
    expect(record).toBeInstanceOf(Record);
    expect(
      record.metadata.getStandardMetadata(RecordMetadataKey.BLACK_NAME)
    ).toBe("ZhangJingding");
    expect(
      record.metadata.getStandardMetadata(RecordMetadataKey.WHITE_NAME)
    ).toBe("Sota_FUJII");
    expect(record.position.board.at(new Square(2, 2))).toBeNull();
    expect(record.position.board.at(new Square(8, 2))).toStrictEqual(
      new Piece(Color.WHITE, PieceType.ROOK)
    );
    record.goto(104);
    const move = record.current.move as Move;
    expect(move.getDisplayText()).toBe("▲９一角成(64)");
    expect(record.current.elapsedMs).toBe(21000);
    expect(record.current.totalElapsedMs).toBe(670000);
    record.goto(999);
    expect(record.current.number).toBe(178);
    expect(record.current.move).toBe(SpecialMove.RESIGN);
    expect(record.current.elapsedMs).toBe(11000);
    expect(record.current.totalElapsedMs).toBe(1364000);
  });

  it("import/PiyoShogi", () => {
    const data = `
# ----  ぴよ将棋 棋譜ファイル  ----
棋戦：将棋ウォーズ(10分切れ負け)
戦型：
開始日時：0000/00/00 00:00:00
終了日時：
手合割：平手
先手：foo 四段
後手：bar 三段
手数----指手---------消費時間--
*詳細URL：https://www.shogi-extend.com/swars/battles/foo-bar-00000000_000000
*ぴよ将棋：https://www.shogi-extend.com/swars/battles/foo-bar-00000000_000000/piyo_shogi
*KENTO：https://www.shogi-extend.com/swars/battles/foo-bar-00000000_000000/kento
   1 ７六歩(77)   ( 0:01/00:00:01)
*#定跡手
*#推奨定跡: ▲２六歩   ▲７六歩   ▲６八銀   
   2 ８四歩(83)   ( 0:01/00:00:01)
*△備考：居飛車
*#定跡手
*#推奨定跡: △３四歩   △８四歩   △４二銀   △３二金   
   3 ２六歩(27)   ( 0:09/00:00:10)
*▲備考：居飛車
*#定跡手
*#推奨定跡: ▲２六歩   ▲６八銀   ▲５六歩   ▲７八銀   
*#定跡: ▲７八金   
   4 ３二金(41)   ( 0:02/00:00:03)
*#定跡手
*#定跡: △３二金   △８五歩   △３四歩   
   5 ２五歩(26)   ( 0:02/00:00:12)
*#定跡手
*#定跡: ▲７八金   ▲２五歩   ▲６八銀   
   6 １四歩(13)   ( 0:02/00:00:05)
*#指し手[72]△１四歩  ▲６八銀  △３四歩  ▲７七銀  △３三角  ▲７八金  △８五歩  ▲６九玉  △２二銀  ▲４八銀  △４二角  
*#推奨手[29]△４二銀  ▲５八金右  △３四歩  ▲２四歩  △同歩  ▲同飛  △３三銀  ▲２八飛  △２三歩打  ▲７七角  △５二金  ▲８八銀  △４四歩  ▲４八銀  
*#定跡: △８五歩   △３四歩   
   7 ２四歩(25)   ( 0:11/00:00:23)
*#指し手[72]▲２四歩  △同歩  ▲同飛  △２三歩打  ▲２八飛  △５二金  ▲６八銀  △３四歩  ▲７七銀  △４一玉  ▲２四歩打  △同歩  ▲同飛  △８五歩  ▲２八飛  
*#定跡: ▲７八金   
   8 ２四歩(23)   ( 0:01/00:00:06)
*#定跡手
*#定跡: △２四歩   
   9 ２四飛(28)   ( 0:01/00:00:24)
*#定跡手
*#定跡: ▲２四飛   
  10 ２三歩打     ( 0:01/00:00:07)
*#定跡手
*#定跡: △２三歩打   
  11 ２八飛(24)   ( 0:01/00:00:25)
*#指し手[68]▲２八飛  △３四歩  ▲７八金  △８五歩  ▲５八玉  △８六歩  ▲同歩  △同飛  ▲２四歩打  △同歩  ▲同飛  △４二玉  ▲８七歩打  △７六飛  ▲２二角成  △同銀  ▲３四飛  △パス  ▲パス  
*#定跡: ▲２六飛   
  12 ６二銀(71)   ( 0:02/00:00:09)
*#指し手[74]△６二銀  ▲６八銀  △３四歩  ▲７七銀  △４二銀  ▲７八金  △３三銀  ▲４八銀  △４一玉  ▲６九玉  △５四歩  
*#定跡: △３四歩   
  13 ６八銀(79)   ( 0:02/00:00:27)
*#定跡手
*#定跡: ▲３八銀   ▲６八銀   
  14 ８五歩(84)   ( 0:00/00:00:09)
*#定跡手
*#定跡: △８五歩   
  15 ７七角(88)   ( 0:01/00:00:28)
*#指し手[25]▲７七角  △７四歩  ▲３六歩  △７三銀  ▲７八金  △６四銀  ▲４八銀  △４二玉  ▲６六歩  △７五歩  ▲６七銀  
*#推奨手[89]▲７七銀  △７四歩  ▲７八金  △７三銀  ▲４八銀  △６四銀  ▲６九玉  △３四歩  ▲２四歩打  △同歩  ▲同飛  △４一玉  ▲３四飛  △パス  
*#定跡: ▲７七銀   
  16 ５四歩(53)   ( 0:02/00:00:11)
*#指し手[40]△５四歩  ▲７八金  △５三銀  ▲６九玉  △４二銀上  ▲５六歩  △４一玉  ▲６六歩  △３四歩  ▲２四歩打  △同歩  ▲同飛  △３三銀  ▲２八飛  
*#定跡: △７四歩   
  17 ６六歩(67)   ( 0:01/00:00:29)
*#指し手[35]▲６六歩  △４二銀  ▲５六歩  △４一玉  ▲７八金  △３四歩  ▲４八銀  △７四歩  ▲６九玉  △３三銀  ▲５八金  
*#推奨手[74]▲４八銀  △４一玉  ▲７八金  △４二銀  ▲５六歩  △７四歩  ▲６九玉  △５三銀右  ▲５七銀右  △６四銀  ▲６六銀  
  18 ５三銀(62)   ( 0:03/00:00:14)
*#指し手[37]△５三銀  ▲７八金  △４一玉  ▲６九玉  △３四歩  ▲５六歩  △４二銀上  ▲６七銀  △７四歩  ▲６八角  △６四銀  ▲２四歩打  △同歩  ▲同飛  △２三歩打  ▲３四飛  △５五歩  ▲同歩  
  19 ６七銀(68)   ( 0:02/00:00:31)
*#指し手[32]▲６七銀  △４一玉  ▲７八金  △３四歩  ▲４八銀  △４二銀上  ▲６九玉  △４四銀  ▲７九玉  △３五銀  ▲５六歩  △４四角  ▲８八玉  △３一玉  ▲５九金  
  20 ５五歩(54)   ( 0:01/00:00:15)
*#指し手[132]△５五歩  ▲７八金  △４二銀上  ▲６九玉  △４四銀  ▲６八角  △３一角  ▲３六歩  △４一玉  ▲４八銀  △３四歩  ▲７九玉  △７四歩  
*#推奨手[23]△４四銀  ▲７八金  △４二銀  ▲６九玉  △４一玉  ▲４八銀  △３一角  ▲３六歩  △３四歩  ▲７九玉  △７四歩  ▲３七銀  △５二金  
  21 ７八金(69)   ( 0:03/00:00:34)
*#指し手[139]▲７八金  △４二銀上  ▲６九玉  △４四歩  ▲４八銀  △４三銀  ▲５六歩  △同歩  ▲同銀  △４一玉  ▲５七銀  △３四歩  ▲５八金  △７四歩  
  22 ３四歩(33)   ( 0:02/00:00:17)
*#指し手[143]△３四歩  ▲６九玉  △４一玉  ▲６八角  △４二銀上  ▲３六歩  △７四歩  ▲４八銀  △６四銀  ▲３七銀  △７五歩  ▲同歩  △同銀  ▲７六歩打  △６四銀  
  23 ４八銀(39)   ( 0:04/00:00:38)
*#指し手[120]▲４八銀  △４二銀上  ▲６九玉  △４一玉  ▲６八角  △６四銀  ▲３六歩  △７四歩  ▲３七銀  △５三銀上  ▲７九玉  △７五歩  ▲同歩  △同銀  ▲７六歩打  △６四銀引  ▲４六銀  
  24 ４二銀(31)   ( 0:01/00:00:18)
*#指し手[121]△４二銀上  ▲６九玉  △４一玉  ▲６八角  △６四銀  ▲３六歩  △７四歩  ▲５八金  △７五歩  ▲７九玉  △５二金  ▲７五歩  △同銀  ▲７六歩打  △６四銀  
  25 ４六歩(47)   ( 0:02/00:00:40)
*#指し手[120]▲４六歩  △４一玉  ▲３六歩  △６四銀  ▲３七桂  △７四歩  ▲３八金  △７五歩  ▲同歩  △同銀  ▲７六歩打  △６四銀  ▲２四歩打  △同歩  ▲同飛  △２三歩打  ▲３四飛  △５二金  
  26 ４一玉(51)   ( 0:01/00:00:19)
*#指し手[124]△４一玉  ▲５八金  △７四歩  ▲６八角  △６四銀  ▲６九玉  △７五歩  ▲４七銀  △７六歩  ▲同銀  △７五歩打  ▲６七銀  △５二金  
  27 ４七銀(48)   ( 0:01/00:00:41)
*#指し手[146]▲４七銀  △５四銀  ▲６九玉  △５二金  ▲７九玉  △５三銀  ▲５八金  △４四歩  ▲６八角  △６四歩  ▲２四歩打  △同歩  ▲同飛  △２三歩打  ▲３四飛  △４二金右  
  28 ５四銀(53)   ( 0:01/00:00:20)
*#指し手[129]△５四銀  ▲６八玉  △４四歩  ▲５八金  △５二金  ▲３六歩  △７四歩  ▲３七桂  △４三金右  ▲２九飛  △３一玉  
*#推奨手[104]△７四歩  ▲６九玉  △６四銀  ▲５八金  △７五歩  ▲６八角  △９四歩  ▲７九玉  △７六歩  ▲同銀  △５二金  ▲７四歩打  △３一玉  
  29 ３六銀(47)   ( 0:04/00:00:45)
*▲戦型：鎖鎌銀
*#指し手[89]▲３六銀  △４四歩  ▲６八玉  △５二金  ▲５八金  △３三銀  ▲７九玉  △４三金右  ▲６八角  △３一角  ▲８八玉  
*#推奨手[132]▲３六歩  △３三銀  ▲３七桂  △３一角  ▲６八玉  △５二金  ▲５八金  △４四歩  ▲７九玉  △４三金右  
  30 ３三桂(21)   ( 0:17/00:00:37)
*#指し手[117]△３三桂  ▲２四歩打  △同歩  ▲同飛  △５三銀  ▲６九玉  △４四歩  ▲５八金  △２三歩打  ▲３四飛  △５二金  ▲７九玉  △４三金右  ▲３五飛  
  31 １六歩(17)   ( 0:10/00:00:55)
*#指し手[97]▲１六歩  △４四歩  ▲６八玉  △５二金  ▲５八金  △４三銀上  ▲７九玉  △９四歩  ▲６八角  △３一角  
  32 ４四歩(43)   ( 0:02/00:00:39)
*#指し手[76]△４四歩  ▲６八角  △５二金  ▲６九玉  △４三銀上  ▲７九玉  △７四歩  ▲５八金  △９四歩  ▲８八玉  △３一角  ▲９六歩  △６四角  
  33 ５八金(49)   ( 0:02/00:00:57)
*#指し手[103]▲５八金  △４三銀上  ▲６八玉  △３一角  ▲７九玉  △５二金  ▲６八角  △９四歩  ▲２四歩打  △同歩  ▲同飛  △２三歩打  ▲２八飛  △８六歩  ▲同歩  △同角  ▲同角  △同飛  ▲８七歩打  △８二飛  ▲７一角打  △７二飛  
  34 ４三銀(42)   ( 0:01/00:00:40)
*#指し手[47]△４三銀上  ▲６八玉  △５二金  ▲７九玉  △７四歩  ▲１七桂  △１三角  ▲２五桂  △同桂  ▲同銀  △４六角  ▲４七金  △３五角  
  35 ６九王(59)   ( 0:02/00:00:59)
*#指し手[16]▲６九玉  △５二金  ▲５六歩  △３一角  ▲５五歩  △同銀  ▲４七金  △８六歩  ▲同角  △同角  ▲同歩  △同飛  ▲８七歩打  △８二飛  ▲５八飛  △６四銀  
*#推奨手[73]▲１七桂  △５二金  ▲２五桂  △３一角  ▲３三桂  △同金  ▲６八玉  △４二角  ▲７九玉  △７四歩  ▲６八角  △６四桂打  ▲２七飛  
  36 ３一角(22)   ( 0:02/00:00:42)
*#指し手[82]△３一角  ▲１七桂  △４二角  ▲２五桂  △５二金  ▲７九玉  △９四歩  ▲８八玉  △７四歩  ▲３三桂  △同金  ▲９六歩  
  37 １七桂(29)   ( 0:15/00:01:14)
*#指し手[102]▲１七桂  △５一金  ▲２五桂  △４二角  ▲３三桂成  △同金  ▲２九飛  △７四歩  ▲７九玉  △９四歩  ▲９六歩  △パス  ▲８八玉  
  38 ７四歩(73)   ( 0:05/00:00:47)
*#指し手[95]△７四歩  ▲２五桂  △４二角  ▲３三桂成  △同金  ▲９六歩  △２四歩  ▲２五歩打  △同歩  ▲４五歩  △３二玉  ▲４四歩  △同金  
  39 ２五桂(17)   ( 0:02/00:01:16)
*#指し手[88]▲２五桂  △４二角  ▲６八角  △５二金  ▲７九玉  △９四歩  ▲３三桂成  △同金  ▲９六歩  △５一金  ▲８八玉  △６四桂打  ▲４七銀  
  40 ７五歩(74)   ( 0:06/00:00:53)
*#指し手[62]△７五歩  ▲３三桂成  △同金  ▲７五歩  △同角  ▲４八飛  △６四角  ▲７九玉  △７四桂打  ▲４五歩  △８六歩  ▲同歩  △同桂  ▲８八金  △３二玉  
  41 ３三桂成(25) ( 0:24/00:01:40)
*#指し手[77]▲３三桂成  △同金  ▲７五歩  △同角  ▲７四歩打  △３一角  ▲７九玉  △５二金  ▲９五角  △６四角  ▲６八角  
  42 ３三金(32)   ( 0:01/00:00:54)
*#指し手[86]△３三金  ▲７五歩  △同角  ▲７四歩打  △６二金  ▲４八飛  △４二角  ▲４五歩  △同歩  ▲同銀  △同銀  ▲同飛  △４四歩打  ▲４八飛  △３二玉  
  43 ７五歩(76)   ( 0:01/00:01:41)
*#指し手[74]▲７五歩  △同角  ▲７四歩打  △７二飛  ▲７六銀  △４二角  ▲８五銀  △５二金  ▲８六角  △８二飛  ▲４二角成  △同金  ▲７六銀  
  44 ７五角(31)   ( 0:02/00:00:56)
*#指し手[99]△７五角  ▲７四歩打  △７二飛  ▲７六銀  △４二角  ▲８五銀  △８四歩打  ▲７六銀  △７四飛  ▲６七金右  △５二金  ▲７五歩打  △７二飛  
  45 ７四歩打     ( 0:09/00:01:50)
*▲手筋：垂れ歩
*#指し手[81]▲７四歩打  △６二金  ▲７九玉  △４二角  ▲４八飛  △７二飛  ▲４五歩  △７四飛  ▲４四歩  △同銀  ▲４五歩打  △５三銀  
  46 ８六歩(85)   ( 0:26/00:01:22)
*#指し手[261]△８六歩  ▲同角  △同角  ▲同歩  △６四角打  ▲８五歩  △同飛  ▲８七歩打  △８六歩打  ▲同歩  △同飛  ▲８七歩打  △８二飛  
*#推奨手[46]△６二金  ▲２九飛  △４二角  ▲７九玉  △９四歩  ▲２二歩打  △３一玉  ▲２一歩成  △同玉  ▲１五歩  △３二金  
  47 ８六歩(87)   ( 0:03/00:01:53)
*#指し手[143]▲８六歩  △８四飛  ▲７六銀  △６四角  ▲６七金右  △５二金  ▲８五銀  △８二飛  ▲７六銀  
  48 ８四飛(82)   ( 0:46/00:02:08)
*#指し手[146]△８四飛  ▲２二歩打  △３一玉  ▲１五歩  △同歩  ▲１三歩打  △１六桂打  ▲２六飛  △３二金  ▲２一歩成  △同玉  ▲２五桂打  △２四歩  ▲１二歩成  △同香  ▲１六香  
  49 ７六銀(67)   ( 0:18/00:02:11)
*#指し手[59]▲７六銀  △４二角  ▲８五銀  △８二飛  ▲６七金右  △５二金  ▲７六銀  △６四桂打  ▲７五銀  
*#推奨手[185]▲２五銀  △４二角  ▲１五歩  △同歩  ▲１三歩打  △２四歩  ▲５三桂打  △同角  ▲２四銀  △３二金  ▲２三銀成  △４二金  
  50 ３一角(75)   ( 0:16/00:02:24)
*#指し手[225]△３一角  ▲２二歩打  △３二銀  ▲７九玉  △７四飛  ▲７五歩打  △８四飛  ▲６七金右  △８二飛  ▲２一歩成  △同銀  
*#推奨手[90]△４二角  ▲１五歩  △同歩  ▲１三歩打  △３二金  ▲８五銀  △８二飛  ▲２四歩打  △同歩  ▲１五香  △２二金  
  51 ２二歩打     ( 0:02/00:02:13)
*▲手筋：垂れ歩
*#指し手[218]▲２二歩打  △３二銀  ▲４五歩  △同歩  ▲８五銀  △８二飛  ▲４八飛  △４六歩  ▲同飛  △４四歩打  ▲４五歩打  △２二角  ▲５三桂打  △５二玉  
  52 ３二玉(41)   ( 0:10/00:02:34)
*#指し手[674]△３二玉  ▲２五桂打  △２二玉  ▲３三桂  △同玉  ▲２一金打  △５三角  ▲１一金  △７四飛  ▲７五歩打  △７二飛  
*#推奨手[452]△８六角  ▲８五歩打  △７七角成  ▲同金  △７四飛  ▲５三桂打  △３二玉  ▲６一桂成  △２二玉  ▲５一角打  △８八歩打  ▲１五歩  △８九歩成  
  53 １五歩(16)   ( 0:02/00:02:15)
*#指し手[476]▲１五歩  △同歩  ▲２五桂打  △２二角  ▲３三桂成  △同角  ▲７五銀  △８二飛  ▲５三金打  △７六歩打  ▲６八角  
*#推奨手[535]▲２五桂打  △２二角  ▲３三桂成  △同角  ▲７五銀  △８三飛  ▲８四金打  △８二飛  ▲７三歩成  △５二飛  ▲７四と  
  54 ２二玉(32)   ( 0:05/00:02:39)
*#指し手[341]△２二玉  ▲１四歩  △１二歩打  ▲６七金右  △７四飛  ▲２五銀  △５二金  ▲２四歩打  △同歩  ▲同銀  △同金  ▲同飛  △２三歩打  ▲２八飛  
  55 １四歩(15)   ( 0:03/00:02:18)
*#指し手[294]▲１四歩  △１二歩打  ▲７九玉  △７四飛  ▲６七金右  △７五桂打  ▲６八金引  △８七歩打  ▲２五桂打  △３二金  ▲６五歩  △パス  
  56 １二歩打     ( 0:01/00:02:40)
*#指し手[287]△１二歩打  ▲７九玉  △７四飛  ▲６七金右  △４二角  ▲７五歩打  △７二飛  ▲２五桂打  △３二金  
  57 ２五銀(36)   ( 0:13/00:02:31)
*#指し手[198]▲２五銀  △４二角  ▲８五歩  △７四飛  ▲７五歩打  △７二飛  ▲８四歩  
*#推奨手[266]▲７九玉  △４二角  ▲４五歩  △同歩  ▲６五銀  △５二金  ▲５四銀  △同銀  ▲２五桂打  △４三金寄  ▲４四歩打  △同金  
  58 ７四飛(84)   ( 0:52/00:03:32)
*#指し手[502]△７四飛  ▲７五歩打  △７二飛  ▲２四歩打  △同歩  ▲同銀  △同金  ▲同飛  △２三歩打  ▲２六飛  △６四桂打  ▲６五銀  △同銀  ▲同歩  
*#推奨手[215]△４二角  ▲３六桂打  △７四飛  ▲７五歩打  △７二飛  ▲２四歩打  △６四桂打  ▲２三歩成  △同玉  ▲６五銀  △３二玉  ▲５四銀  △同銀  
  59 ８五銀(76)   ( 0:06/00:02:37)
*#指し手[205]▲８五銀  △７二飛  ▲２四歩打  △同歩  ▲同銀  △同金  ▲同飛  △２三歩打  ▲２九飛  △７六歩打  ▲６八角  
*#推奨手[397]▲７五歩打  △７二飛  ▲２四歩打  △同歩  ▲同銀  △同金  ▲同飛  △２三歩打  ▲２七飛  △６四桂打  ▲６七銀  △７六歩打  ▲２四歩打  △７七歩成  ▲２三歩成  
  60 ７二飛(74)   ( 0:05/00:03:37)
*#指し手[280]△７二飛  ▲２四歩打  △同歩  ▲同銀  △同金  ▲同飛  △２三歩打  ▲２八飛  △７六歩打  ▲６八角  △７七桂打  ▲同桂  △同歩成  ▲同角  
  61 ２四歩打     ( 0:01/00:02:38)
*#指し手[235]▲２四歩打  △同歩  ▲同銀  △同金  ▲同飛  △２三歩打  ▲２八飛  △３二銀打  ▲７四歩打  △５二金  ▲１八飛  △２四歩  ▲パス  
  62 ２四歩(23)   ( 0:05/00:03:42)
*#指し手[355]△２四歩  ▲同銀  △同金  ▲同飛  △２三歩打  ▲２一金打  △３三玉  ▲２九飛  △３八銀打  ▲２八飛  △７六歩打  ▲６八角  △７七桂打  ▲同桂  
  63 ２四銀(25)   ( 0:03/00:02:41)
*#指し手[247]▲２四銀  △同金  ▲同飛  △２三歩打  ▲２九飛  △７六歩打  ▲６八角  △３二玉  ▲７三歩打  △同飛  ▲７四歩打  △７二飛  ▲７六銀  
  64 ２四金(33)   ( 0:00/00:03:42)
*#指し手[302]△２四金  ▲同飛  △２三歩打  ▲２九飛  △２四銀打  ▲３六桂打  △３五銀  ▲７四歩打  △５二金  ▲２五金打  △３三桂打  ▲１五金  △パス  
  65 ２四飛(28)   ( 0:01/00:02:42)
*#指し手[319]▲２四飛  △２三歩打  ▲２九飛  △２四銀打  ▲７六歩打  △６四角  ▲１六桂打  △３五銀  ▲２四歩打  △同歩  ▲３六歩  △４六銀  ▲２四桂  △７五歩打  
  66 ２三歩打     ( 0:01/00:03:43)
*#指し手[288]△２三歩打  ▲２一金打  △同玉  ▲２三飛成  △２二角  ▲１三歩成  △同歩  ▲１二歩打  △同香  ▲２四桂打  △１一金打  
  67 ２八飛(24)   ( 0:01/00:02:43)
*#指し手[193]▲２八飛  △４二角  ▲７九玉  △５二金  ▲７六歩打  △８七歩打  ▲同金  △９五桂打  ▲８八金  
*#推奨手[243]▲２六飛  △２四銀打  ▲７四歩打  △５二金  ▲３六桂打  △３五銀  ▲２九飛  △３二玉  ▲２四歩打  △同歩  ▲同桂  △４二玉  
  68 ７六歩打     ( 0:21/00:04:04)
*#指し手[348]△７六歩打  ▲６八角  △５一金  ▲７四歩打  △４二角  ▲７六銀  △７四飛  ▲１五桂打  △３二銀打  ▲７五歩打  △７二飛  
  69 ５九角(77)   ( 0:02/00:02:45)
*#指し手[317]▲５九角  △４二角  ▲８三金打  △６二飛  ▲７六銀  △６四桂打  ▲６七銀  
  70 ７七桂打     ( 0:09/00:04:13)
*#指し手[512]△７七桂打  ▲同桂  △同歩成  ▲同金  △４二角  ▲１五桂打  △３二銀打  ▲７四歩打  △５二金  ▲７八玉  
*#推奨手[227]△４二角  ▲７四歩打  △５二金  ▲７六銀  △７四飛  ▲７五歩打  △７二飛  ▲４一金打  △６四角  
  71 ７七桂(89)   ( 0:01/00:02:46)
*#指し手[709]▲７七桂  △３二銀打  ▲１五桂打  △４二角  ▲７三歩打  △同飛  ▲７四歩打  △７七歩成  ▲２三桂成  △同銀  ▲７三歩成  △７八と  ▲同玉  
  72 ７七歩成(76) ( 0:01/00:04:14)
*#指し手[666]△７七歩成  ▲同金  △３二銀  ▲１五桂打  △３三玉  ▲７六歩打  △７三桂  ▲７四銀  △８八銀打  ▲２五桂打  △４二玉  ▲２三桂成  △同銀  
*#【詰めろ】
  73 ７七金(78)   ( 0:06/00:02:52)
*#指し手[713]▲７七金  △３三玉  ▲７四歩打  △８八銀打  ▲１五桂打  △３二銀  ▲７八金  △９九銀  ▲７七角  △８八歩打  ▲３六桂打  △７五香打  ▲２三桂成  △同銀  
  74 ７五歩打     ( 0:11/00:04:25)
*#指し手[1617] 悪手 △７五歩打  ▲１五桂打  △３二銀  ▲２三桂成  △同銀  ▲１五桂打  △３二銀打  ▲２三桂成  △同銀  ▲２四歩打  △同銀  ▲同飛  
*#推奨手[696]△３二銀打  ▲７六歩打  △６四角  ▲７八玉  △７五歩打  
  75 １五桂打     ( 0:06/00:02:58)
*#指し手[1669]▲１五桂打  △３二銀  ▲２三桂成  △同銀  ▲１五桂打  △２四銀打  ▲２一金打  △同玉  ▲２三桂成  △３二桂打  ▲７四歩打  △２五金打  ▲１三歩成  
*#【詰めろ】
  76 ２四銀打     ( 0:10/00:04:35)
*#指し手[2956]△２四銀打  ▲同飛  △３二銀  ▲３四飛  △４二角  ▲３五桂打  △３一桂打  ▲４四飛  △７六歩  ▲同銀  △４三銀引  
  77 ２三桂成(15) ( 0:02/00:03:00)
*#指し手[1658] 疑問 ▲２三桂成  △同玉  ▲３六桂打  △３二玉  ▲２四飛  △７三桂  ▲２三銀打  △４二玉  ▲７四銀  
*#推奨手[2247]▲１三歩成  △同歩  ▲２四飛  △３二銀  ▲３四飛  △３三歩打  ▲４四飛  △４三銀上  ▲２三桂成  △同玉  ▲３五桂打  △３二玉  ▲２三銀打  △４二玉  ▲４三桂成  △同銀  
  78 ２三玉(22)   ( 0:02/00:04:37)
*#指し手[1722]△２三玉  ▲３六桂打  △７三桂  ▲２四飛  △３二玉  ▲７四銀  △７六歩  ▲同金  △６四桂打  ▲７七金  △５六歩  ▲２三銀打  △４一玉  ▲３四銀成  
  79 １五桂打     ( 0:01/00:03:01)
*#指し手[1406]▲１五桂打  △３三玉  ▲２三金打  △４二玉  ▲２四飛  △６四桂打  ▲７四歩打  △７六歩  ▲６七金寄  
*#推奨手[1720]▲３六桂打  △６四桂打  ▲２四桂  △３三玉  ▲１二桂成  △７六歩  ▲同銀  △同桂  ▲２一飛成  △４二玉  ▲１一龍  △８八桂成  ▲パス  
  80 １四玉(23)   ( 0:23/00:05:00)
*#指し手[1637]△１四玉  ▲３三金打  △２五歩打  ▲２三桂  △１五桂打  ▲同香  △同玉  ▲３六歩  △１四玉  ▲１五歩打  △１三玉  ▲３一桂成  △３三銀  ▲２五飛  
*#推奨手[1291]△３三玉  ▲２三金打  △４二玉  ▲２四飛  △６四桂打  ▲８三銀打  △７六歩  ▲７八金  △５二飛  ▲７四銀引成  △５三玉  
  81 ３三金打     ( 0:46/00:03:47)
*#指し手[1351]▲３三金打  △２五歩打  ▲２三桂成  △１五桂打  ▲３六歩  △２六桂打  ▲２七歩打  △３三銀  ▲同成桂  △２四玉  ▲４三成桂  △同銀  ▲２六歩  △３三玉  ▲２五歩  △７六歩  
  82 ２五歩打     ( 0:47/00:05:47)
*#指し手[1417]△２五歩打  ▲２三桂成  △１五桂打  ▲３六歩  △２六桂打  ▲２七歩打  △３三銀  ▲同成桂  △２四玉  ▲４三成桂  △同銀  ▲２六歩  △同歩  ▲同飛  △２五歩打  ▲２九飛  △３三玉  
  83 ２三桂成(15) ( 0:11/00:03:58)
*#指し手[1649]▲２三桂成  △１五桂打  ▲３六歩  △２六桂打  ▲２七歩打  △３三銀  ▲同成桂  △２四玉  ▲４三成桂  △同銀  ▲２六歩  △同歩  ▲同飛  △２五歩打  ▲２八飛  △１四金打  ▲１五角  
  84 １五桂打     ( 0:02/00:05:49)
*#指し手[1382]△１五桂打  ▲３六歩  △２六桂打  ▲２七歩打  △３三銀  ▲同成桂  △７三桂  ▲２六歩  △８五桂  ▲同歩  △２四玉  ▲４三成桂  △同銀  ▲２五歩  △３三玉  ▲２四銀打  △４二玉  
  85 １六歩打     ( 0:02/00:04:00)
*#指し手[1256] 疑問 ▲１六歩打  △３三銀  ▲同成桂  △２四玉  ▲４三成桂  △同銀  ▲１五歩  △７三桂  ▲９六銀  
*#推奨手[1875]▲３六歩  △２六桂打  ▲２七歩打  △３三銀  ▲同成桂  △５二金  ▲２六歩  △２四玉  ▲４三成桂  △同金  ▲２五歩  △３三玉  ▲１五角  △３二玉  ▲５一角成  
  86 ３三銀(24)   ( 0:01/00:05:50)
*#指し手[1309]△３三銀  ▲同成桂  △２四玉  ▲４三成桂  △同銀  ▲１五歩  △３二桂打  ▲１四銀打  △３三玉  ▲２五飛  △２四金打  ▲２九飛  
  87 ３三成桂(23) ( 0:02/00:04:02)
*#指し手[1369]▲３三成桂  △２四玉  ▲４三成桂  △同銀  ▲１五歩  △５四桂打  ▲３六桂打  △３三玉  ▲４五歩  △同歩  ▲２五飛  △７六歩  ▲同銀  
  88 ２四玉(14)   ( 0:04/00:05:54)
*#指し手[1361]△２四玉  ▲４三成桂  △同銀  ▲１五歩  △３二桂打  ▲１四銀打  △３三玉  ▲２五飛  △２四金打  ▲２九飛  △１三歩  ▲２五歩打  △１四金  ▲同歩  
  89 ４三成桂(33) ( 0:10/00:04:12)
*#指し手[1401]▲４三成桂  △同銀  ▲１五歩  △３三玉  ▲２五飛  △２四桂打  ▲２九飛  △３八金打  ▲２七飛  △３五桂打  ▲２五桂打  △４二玉  ▲３三銀打  △５二玉  
  90 ４三銀(54)   ( 0:01/00:05:55)
*#指し手[1347]△４三銀  ▲１五歩  △７六歩  ▲３六桂打  △３三玉  ▲７六銀  △６四桂打  ▲６五銀  △７三桂  ▲２五飛  △４二玉  ▲２一飛成  △６五桂  ▲同歩  
  91 １五歩(16)   ( 0:01/00:04:13)
*#指し手[1378]▲１五歩  △３五歩  ▲１六桂打  △３三玉  ▲２五飛  △３二銀  ▲２四銀打  △４三玉  ▲３五銀  △７三桂  ▲７四銀  
  92 ２六桂打     ( 0:02/00:05:57)
*#指し手[1454]△２六桂打  ▲１四銀打  △１三歩  ▲３六桂打  △３五玉  ▲４七金  △４二角  ▲２三銀成  △４九金打  ▲６八角  
  93 ３六銀打     ( 0:07/00:04:20)
*#指し手[1232]▲３六銀打  △３五歩  ▲２五銀  △同玉  ▲１四銀打  △３四玉  ▲２六飛  △３二銀打  ▲８四桂打  △８二飛  ▲２四歩打  △パス  
  94 １三歩(12)   ( 1:08/00:07:05)
*#指し手[1529]△１三歩  ▲１六桂打  △３三玉  ▲２五銀  △４二玉  ▲２六飛  △５二玉  
*#推奨手[1451]△２二飛  ▲１四銀打  △３三玉  ▲２四歩打  △同飛  ▲２五銀引  △２一飛  ▲２四歩打  △１八桂成  ▲同香  
  95 ２五銀(36)   ( 1:28/00:05:48)
*#指し手[1773]▲２五銀  △同玉  ▲３六歩  △２四玉  ▲２六飛  △３三玉  ▲２一飛成  △２二銀打  ▲２五桂打  △２四玉  ▲２六銀打  
  96 ２五玉(24)   ( 0:08/00:07:13)
*#指し手[1564]△２五玉  ▲３六歩  △２四玉  ▲２六飛  △３三玉  ▲２一飛成  △２二銀打  ▲２五桂打  △４二玉  ▲２三歩打  △３二銀  ▲２二歩成  △２一銀  ▲３一と  
  97 ３六歩(37)   ( 0:08/00:05:56)
*#指し手[1662]▲３六歩  △２四玉  ▲２六飛  △３三玉  ▲２一飛成  △２二銀打  ▲２五桂打  △４二玉  ▲２三歩打  △３二銀  ▲２二歩成  △２一銀  ▲３一と  
*#【詰めろ】
  98 ２四玉(25)   ( 0:02/00:07:15)
*#指し手[1807]△２四玉  ▲２六飛  △２五銀打  ▲１六桂打  △１五玉  ▲２七桂打  △１四玉  ▲１五銀打  △２三玉  ▲２五飛  △３二玉  ▲１二歩打  △同香  ▲２四銀  
  99 ２六飛(28)   ( 0:02/00:05:58)
*#指し手[1798]▲２六飛  △３三玉  ▲２一飛成  △２二銀打  ▲２五桂打  △４二玉  ▲２三歩打  △３二銀  ▲２二龍  △同角  ▲同歩成  △８九飛打  ▲７九歩打  △７六歩  ▲同銀  
 100 ３三玉(24)   ( 0:01/00:07:16)
*#指し手[2212]△３三玉  ▲２一飛成  △３二金打  ▲２三銀打  △８八銀打  ▲３二銀成  △同飛  ▲２五桂打  △４二玉  ▲３三金打  △５三玉  ▲３二金  △７七銀成  ▲同角  
 101 ２一飛成(26) ( 0:03/00:06:01)
*#指し手[2318]▲２一飛成  △４一金打  ▲２五桂打  △４二玉  ▲２二銀打  △同角  ▲同龍  △５三玉  ▲１一龍  △５二銀  ▲８三角打  △８二飛  ▲１三龍  △４三銀打  
 102 ３二金打     ( 1:32/00:08:48)
*#指し手[2326]△３二金打  ▲２三銀打  △４九銀打  ▲３二銀  △同飛  ▲２四桂打  △５八銀成  ▲同玉  △２二銀打  ▲３二桂成  △同銀  ▲２五桂打  △４三玉  
 103 ２五桂打     ( 0:04/00:06:05)
*#指し手[2625]▲２五桂打  △４二玉  ▲３三銀打  △５三玉  ▲３二銀  △同飛  ▲３三金打  △８八銀打  ▲３二金  △７七銀成  ▲同角  △７六銀打  ▲３一龍  
 104 ４二玉(33)   ( 0:01/00:08:49)
*#指し手[2891]△４二玉  ▲３三銀打  △５三玉  ▲３二銀  △同飛  ▲３三金打  △７三桂  ▲３二金  △８五桂  ▲同歩  △７六歩  ▲同金  △８七銀打  ▲３一龍  
 105 ３三銀打     ( 0:13/00:06:18)
*#指し手[2709]▲３三銀打  △５三玉  ▲３二銀  △同飛  ▲３三金打  △８八銀打  ▲３二金  △４七桂打  ▲同金  △７七銀成  ▲同角  △６七金打  ▲３一龍  
 106 ５三玉(42)   ( 0:01/00:08:50)
*#指し手[2828]△５三玉  ▲３二銀  △同飛  ▲３三金打  △７三桂  ▲３二金  △８五桂  ▲同歩  △７六歩  ▲同金  △８七銀打  ▲７七金  △５四玉  
 107 ３二銀(33)   ( 0:02/00:06:20)
*#指し手[2766]▲３二銀  △同飛  ▲３三金打  △８八銀打  ▲３二金  △４七桂打  ▲６八角  △７七銀成  ▲同角  △５九金打  ▲６八玉  △５八金  ▲同玉  
 108 ３二飛(72)   ( 0:09/00:08:59)
*#指し手[2623]△３二飛  ▲３三金打  △８八銀打  ▲３二金  △７七銀成  ▲同角  △７三桂  ▲３一龍  △８五桂  ▲同歩  △７六銀打  ▲６一龍  
 109 ６五桂打     ( 0:02/00:06:22)
*#指し手[2413]▲６五桂打  △５四玉  ▲５三金打  △同角  ▲同桂成  △同玉  ▲６一龍  △４九銀打  ▲８一龍  △８八銀打  ▲５一龍  △５二金打  ▲７一角打  △６二桂打  
*#推奨手[2902]▲３三金打  △７三桂  ▲３二金  △８五桂  ▲同歩  △７六歩  ▲同金  △８七銀打  ▲７七金  △６七桂打  ▲３一龍  △５九桂成  ▲同玉  △３七角打  ▲４八桂打  
 110 ６二玉(53)   ( 0:14/00:09:13)
*#指し手[2912]△６二玉  ▲３三金打  △１二銀打  ▲１一龍  △２二銀打  ▲同金  △同角  ▲１二龍  △５六歩  ▲２三銀打  △５七歩成  ▲３二銀  △５八と  ▲同玉  
*#推奨手[2508]△５四玉  ▲５三金打  △同角  ▲同桂成  △同玉  ▲６一龍  △５二金打  ▲１一龍  △８八銀打  ▲８一龍  △７七銀成  ▲同角  
 111 ５三金打     ( 0:02/00:06:24)
*#指し手[2648]▲５三金打  △同角  ▲同桂成  △同玉  ▲６一龍  △８八銀打  ▲５一龍  △５二銀  ▲７八金  △７六桂打  ▲６二角打  △４三玉  
 112 ７一玉(62)   ( 0:06/00:09:19)
*#指し手[3773] 悪手 △７一玉  ▲４三金  △４二飛  ▲３一龍  △４三飛  ▲５二銀打  △６二金打  ▲４三銀成  △８八銀打  ▲４一飛打  △７七銀成  ▲同角  
*#推奨手[2680]△５三角  ▲同桂成  △同玉  ▲６一龍  △７三桂  ▲７四銀  △６二銀打  ▲３三金打  △８八銀打  ▲３二金  △同銀  
 113 ４三金(53)   ( 0:02/00:06:26)
*#指し手[3911]▲４三金  △４二飛  ▲同金  △同角  ▲５二飛打  △６二銀打  ▲７二歩打  △同玉  ▲４二飛成  △５一金打  ▲８四銀  △７一玉  
*#先手 悪手:0回  疑問手:2回  好手:0回  定跡:5回  最善手:44回(77%)
*#後手 悪手:2回  疑問手:0回  好手:0回  定跡:5回  最善手:43回(77%)
*#先手 序盤力:94　中盤力:84　終盤力:82　全体:87
*#後手 序盤力:93　中盤力:79　終盤力:68　全体:79
*#棋譜解析 ぴよ将棋 v.4.9.4(Android) Lv.34 4コア ぴよベンチ:326
 114 投了         ( 0:00/00:09:19)
まで113手で先手の勝ち
`;
    const record = importKakinoki(data) as Record;
    expect(record).toBeInstanceOf(Record);
    expect(record.current.move).toBe(SpecialMove.START);
    expect(record.current.comment).toHaveLength(234);
    record.goto(97);
    expect(record.current.move).toBeInstanceOf(Move);
    expect(record.current.comment).toHaveLength(100);
    record.goto(114);
    expect(record.current.move).toBe(SpecialMove.RESIGN);
    expect(record.current.comment).toBe("");
    expect(record.sfen).toBe(
      "lnkg2b+Rl/6r2/p2p1G2p/5pp2/1SpNp2NP/1P1P1PP2/P1G1P4/4G4/L2KB3L w S4P2sn 115"
    );
  });

  it("export/standard", () => {
    const record = new Record();
    record.metadata.setStandardMetadata(RecordMetadataKey.BLACK_NAME, "藤井");
    record.metadata.setStandardMetadata(RecordMetadataKey.WHITE_NAME, "大山");
    record.append(record.position.createMoveBySFEN("7g7f") as Move);
    record.current.setElapsedMs(8 * 1e3);
    record.append(record.position.createMoveBySFEN("3c3d") as Move);
    record.current.setElapsedMs(12 * 1e3);
    record.current.comment = "2手目へのコメント\n2手目へのコメント2";
    record.append(record.position.createMoveBySFEN("8h2b+") as Move);
    record.current.setElapsedMs(15 * 1e3);
    record.append(record.position.createMoveBySFEN("3a2b") as Move);
    record.current.setElapsedMs(3 * 1e3);
    record.append(record.position.createMoveBySFEN("B*4e") as Move);
    record.current.setElapsedMs(6 * 1e3);
    record.append(SpecialMove.INTERRUPT);
    record.goto(3);
    record.append(record.position.createMoveBySFEN("8b2b") as Move);
    record.current.setElapsedMs(5 * 1e3);
    record.append(SpecialMove.RESIGN);
    record.current.setElapsedMs(7 * 1e3);
    expect(exportKakinoki(record, {})).toBe(
      `# KIF形式棋譜ファイル Generated by Electron Shogi
先手：藤井
後手：大山
後手の持駒：
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
|v香v桂v銀v金v玉v金v銀v桂v香|一
| ・v飛 ・ ・ ・ ・ ・v角 ・|二
|v歩v歩v歩v歩v歩v歩v歩v歩v歩|三
| ・ ・ ・ ・ ・ ・ ・ ・ ・|四
| ・ ・ ・ ・ ・ ・ ・ ・ ・|五
| ・ ・ ・ ・ ・ ・ ・ ・ ・|六
| 歩 歩 歩 歩 歩 歩 歩 歩 歩|七
| ・ 角 ・ ・ ・ ・ ・ 飛 ・|八
| 香 桂 銀 金 玉 金 銀 桂 香|九
+---------------------------+
先手の持駒：
先手番
手数----指手---------消費時間--
1 ７六歩(77) ( 0:08/0:00:08)
2 ３四歩(33) ( 0:12/0:00:12)
*2手目へのコメント
*2手目へのコメント2
3 ２二角成(88) ( 0:15/0:00:23)
4 ２二銀(31) ( 0:03/0:00:15)+
5 ４五角打 ( 0:06/0:00:29)
6 中断 ( 0:00/0:00:15)

変化：4手
4 ２二飛(82) ( 0:05/0:00:17)
5 投了 ( 0:07/0:00:30)
`
    );
  });
});
