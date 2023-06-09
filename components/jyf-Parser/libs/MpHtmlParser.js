/*
 将 html 解析为适用于小程序 rich-text 的 DOM 结构
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 author：JinYufeng
*/
const CssHandler = require("./CssHandler.js");
const config = require("./config.js");
var emoji; // 需要使用 emoji 补丁包时将此行改为 const emoji = require("./emoji.js");

function isBlankChar(c) {
	return c == ' ' || c == '\u00A0' || c == '\t' || c == '\r' || c == '\n' || c == '\f';
};
class MpHtmlParser {
	constructor(data, options = {}, cb) {
		this.cb = cb;
		this.CssHandler = new CssHandler(options.tagStyle);
		this.data = data;
		this.DOM = [];
		// #ifdef MP-BAIDU || MP-TOUTIAO
		this._imgMode = options.imgMode;
		// #endif
		this._attrName = '';
		this._attrValue = '';
		this._attrs = {};
		this._domain = options.domain;
		this._protocol = options.domain ? (options.domain.includes("://") ? this._domain.split("://")[0] : "http") :
			undefined;
		this._i = 0;
		this._sectionStart = 0;
		this._state = this.Text;
		this._STACK = [];
		this._tagName = '';
		this._audioNum = 0;
		this._imgNum = 0;
		this._videoNum = 0;
		this._useAnchor = options.useAnchor;
		this._whiteSpace = false;
	};
	parse() {
		if (this.CssHandler) this.data = this.CssHandler.getStyle(this.data);
		if (emoji) this.data = emoji.parseEmoji(this.data);
		// 高亮处理
		if (config.highlight)
			this.data = this.data.replace(/<[pP][rR][eE]([\s\S]*?)>([\s\S]*?)<\/[pP][rR][eE][\s\S]*?>/g,
		function() {
				return "<pre" + arguments[1] + '>' + config.highlight(arguments[2], "<pre" + arguments[1] +
					'>') + "</pre>";
			})
		for (var len = this.data.length; this._i < len; this._i++)
			this._state(this.data[this._i]);
		if (this._state == this.Text) this.setText();
		while (this._STACK.length)
			this.popNode(this._STACK.pop());
		// #ifdef MP-BAIDU || MP-TOUTIAO
		const inlineTags = config.makeMap(
			"abbr,b,big,code,del,em,font,i,ins,label,mark,q,s,small,span,strong,sub,sup,u")
		// 将顶层标签的一些样式提取出来给 rich-text
		const setContain = function(nodes) {
			for (var element of nodes) {
				if (element.type == "text")
					continue;
				if (!element.c) {
					var res = "";
					var style = element.attrs.style;
					var reg = /float[^;]+(?![\s\S]*?float)/i;
					if (reg.test(style)) res += reg.exec(style)[0];
					reg = /margin[^;]+/gi;
					if (reg.test(style)) res += (';' + style.match(reg).join(';'));
					reg = /display\s*:\s*([^;]*)(?![\s\S]*?display)/i;
					if (reg.test(style) && reg.exec(style)[1] != "flex") res += (';' + reg.exec(style)[0]);
					else if (inlineTags[element.name]) res += ";display:inline";
					else res += (";display:" + (element.name == 'img' ? 'inline-block' : 'block'));
					reg = /flex[^;]*:[^;]+/gi;
					if (reg.test(style)) res += (';' + style.match(reg).join(';'));
					reg = /[^;\s]*width[^;]+/gi;
					if (reg.test(style)) res += (';' + style.match(reg).join(';'));
					element.attrs.containStyle = res;
					if (/[^-]width[^pev;]+/.test(";" + style))
						element.attrs.style += ";width:100%";
					let addMargin = "";
					if (/margin\s*:/.test(style)) addMargin = ';margin:0';
					else if (/margin-top/.test(style)) addMargin = ';margin-top:0';
					else if (/margin-bottom/.test(style)) addMargin = ';margin-bottom:0';
					element.attrs.style = (element.attrs.style || '').replace(/margin[^;]*/gi, "");
					element.attrs.style += addMargin;
				} else setContain(element.children);
			}
		};
		setContain(this.DOM);
		// #endif
		if (this.DOM.length) this.DOM[0].PoweredBy = "Parser";
		// console.log(this.DOM)
		if (this.cb)
			this.cb(this.DOM)
		else return this.DOM;
	};
	// 设置属性
	setAttr() {
		if (config.trustAttrs[this._attrName])
			this._attrs[this._attrName] = (this._attrValue ? this._attrValue : (this._attrName == "src" ? "" :
				"true"));
		this._attrValue = '';
		while (isBlankChar(this.data[this._i])) this._i++;
		if (this.checkClose()) this.setNode();
		else this._state = this.AttrName;
	};
	// 设置文本节点
	setText() {
		var text = this.getSelection();
		if (text) {
			if (!this._whiteSpace) {
				// 移除空白符
				var flag = false,
					has = false,
					pos;
				for (var i = 0; i < text.length; i++) {
					if (isBlankChar(text[i])) {
						if (!flag) {
							pos = i;
							flag = true;
						}
					} else {
						has = true;
						if (flag) {
							if (i - pos > 1) text = text.substring(0, pos) + ' ' + text.substring(i);
							i = pos;
							flag = false;
						}
					}
				}
				if (flag) text = text.substring(0, pos) + ' ';
				if (!text || !has) return;
			}
			// 检查实体
			// #ifdef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO
			var entities = {
				lt: "<",
				gt: ">",
				amp: "&",
				quot: '"',
				apos: "'",
				nbsp: "\u00A0",
				ensp: "\u2002",
				emsp: "\u2003",
				ndash: "–",
				mdash: "—",
				middot: "·",
				lsquo: "‘",
				rsquo: "’",
				ldquo: "“",
				rdquo: "”",
				bull: "•",
				hellip: "…",
				permil: "‰",
				copy: "©",
				reg: "®",
				trade: "™",
				times: "×",
				divide: "÷",
				cent: "￠",
				pound: "£",
				yen: "¥",
				euro: "€",
				sect: "§"
			};
			// #endif
			var i = text.indexOf('&'),
				j, decode;
			while (i != -1 && i < text.length) {
				j = text.indexOf(';', i);
				if (j - i >= 2 && j - i <= 7) {
					var entity = text.substring(i + 1, j);
					// #ifdef MP-WEIXIN || MP-QQ || APP-PLUS
					if (!entity.includes("sp") && !entity.includes("lt") && !entity.includes("gt")) {
						decode = true
						break;
					}
					// #endif
					// #ifdef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO
					if (entities[entity]) text = text.substring(0, i) + entities[entity] + text.substring(j + 1);
					// #endif
				}
				i = text.indexOf('&', i + 1);
			}
			var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
			if (slibings.length && slibings[slibings.length - 1].type == "text") {
				slibings[slibings.length - 1].text += text;
				if (decode) slibings[slibings.length - 1].decode = true;
			} else
				slibings.push({
					type: "text",
					text,
					decode
				})
		}
	};
	// 设置元素节点
	setNode() {
		var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
		var node = {
			name: this._tagName.toLowerCase(),
			attrs: this._attrs
		}
		config.LabelAttrsHandler(node, this);
		this._attrs = {};
		if (this.data[this._i] == '>') {
			if (!config.selfClosingTags[this._tagName]) {
				if (config.ignoreTags[node.name]) {
					var j = this._i;
					// 处理要被移除的标签
					while (this._i < this.data.length) {
						this._i = this.data.indexOf("</", this._i);
						if (this._i == -1) return this._i = this.data.length;
						this._i += 2;
						this._sectionStart = this._i;
						while (!isBlankChar(this.data[this._i]) && this.data[this._i] != '>' && this.data[this
							._i] != '/') this._i++;
						if (this.data.substring(this._sectionStart, this._i).toLowerCase() == node.name) {
							this._i = this.data.indexOf('>', this._i);
							if (this._i == -1) this._i = this.data.length;
							else this._sectionStart = this._i + 1;
							this._state = this.Text;
							// 处理svg 
							if (node.name == "svg") {
								var src = this.data.substring(j, this._i + 1);
								if (!node.attrs.xmlns) src = " xmlns=\"http://www.w3.org/2000/svg\"" + src;
								this._i = j;
								while (this.data[j] != '<') j--;
								src = this.data.substring(j, this._i) + src;
								this._i = this._sectionStart - 1;
								node.name = "img";
								node.attrs = {
									src: "data:image/svg+xml;utf8," + src.replace(/#/g, "%23"),
									ignore: "true"
								}
								slibings.push(node);
							}
							break;
						}
					}
					return;
				} else this._STACK.push(node);
				node.children = [];
			}
		} else this._i++;
		this._sectionStart = this._i + 1;
		this._state = this.Text;
		if (!config.ignoreTags[node.name]) {
			// 检查空白符是否有效
			if (node.name == "pre" || (node.attrs.style && node.attrs.style.toLowerCase().includes("white-space") &&
					node.attrs
					.style.toLowerCase().includes("pre"))) {
				this._whiteSpace = true;
				node.pre = true;
			}
			slibings.push(node);
		}
	};
	// 标签出栈处理
	popNode(node) {
		// 替换一些标签名
		if (config.blockTags[node.name]) node.name = 'div';
		else if (!config.trustTags[node.name]) node.name = 'span';
		// 空白符处理
		if (node.pre) {
			this._whiteSpace = false;
			node.pre = undefined;
			for (var i = 0; i < this._STACK.length; i++)
				if (this._STACK[i].pre)
					this._whiteSpace = true;
		}
		// 处理表格的边框
		if (node.name == 'table') {
			if (node.attrs.border)
				node.attrs.style = "border:" + node.attrs.border + "px solid gray;" + (node.attrs.style || '');
			if (node.attrs.hasOwnProperty("cellspacing"))
				node.attrs.style = "border-spacing:" + node.attrs.cellspacing + "px;" + (node.attrs.style || '');

			function setBorder(elem) {
				if (elem.name == 'th' || elem.name == 'td') {
					if (node.attrs.border)
						elem.attrs.style = "border:" + node.attrs.border + "px solid gray;" + (elem.attrs.style ||
							'');
					if (node.attrs.hasOwnProperty("cellpadding"))
						elem.attrs.style = "padding:" + node.attrs.cellpadding + "px;" + (elem.attrs.style || '');
					return;
				}
				if (elem.type == 'text') return;
				for (var i = 0; i < elem.children.length; i++)
					setBorder(elem.children[i]);
			}
			if (node.attrs.border || node.attrs.hasOwnProperty("cellpadding"))
				for (var i = 0; i < node.children.length; i++)
					setBorder(node.children[i]);
		}
		// 合并一些不必要的层，减小节点深度
		if (node.children.length == 1 && node.name == "div" && node.children[0].name == "div") {
			var child = node.children[0];
			node.attrs.style = node.attrs.style || '';
			child.attrs.style = child.attrs.style || '';
			if (node.attrs.style.includes("padding") && (node.attrs.style.includes("margin") || child.attrs.style
					.includes(
						"margin")) && node.attrs.style.includes("display") && child.attrs.style.includes(
				"display") && !(node.attrs.id &&
					node.attrs.id) && !(node.attrs.class && child.attrs.class)) {
				if (child.attrs.style.includes("padding"))
					child.attrs.style = "box-sizing:border-box;" + child.attrs.style;
				node.attrs.style = node.attrs.style + ";" + child.attrs.style;
				node.attrs.id = (child.attrs.id || '') + (node.attrs.id || '');
				node.attrs.class = (child.attrs.class || '') + (node.attrs.class || '');
				node.children = child.children;
			}
		}
		// 多层样式处理
		if (this.CssHandler.pop)
			this.CssHandler.pop(node);
	};
	// 工具函数
	checkClose() {
		if (this.data[this._i] == '>' || (this.data[this._i] == '/' && this.data[this._i + 1] == '>'))
			return true;
		return false;
	};
	getSelection(trim) {
		var str = (this._sectionStart == this._i ? '' : this.data.substring(this._sectionStart, this._i));
		while (trim && isBlankChar(this.data[++this._i]));
		if (trim) this._i--;
		this._sectionStart = this._i + 1;
		return str;
	};
	// 状态机
	Text(c) {
		if (c == '<') {
			var next = this.data[this._i + 1];
			if ((next >= 'a' && next <= 'z') || (next >= 'A' && next <= 'Z')) {
				this.setText();
				this._state = this.TagName;
			} else if (next == '/') {
				this.setText();
				this._i++;
				next = this.data[this._i + 1];
				if ((next >= 'a' && next <= 'z') || (next >= 'A' && next <= 'Z')) {
					this._sectionStart = this._i + 1;
					this._state = this.EndTag;
				} else
					this._state = this.Comment;
			} else if (next == '!') {
				this.setText();
				this._state = this.Comment;
			}
		}
	};
	Comment() {
		if (this.data.substring(this._i + 1, this._i + 3) == "--" || this.data.substring(this._i + 1, this._i +
			7) ==
			"[CDATA[") {
			this._i = this.data.indexOf("-->", this._i + 1);
			if (this._i == -1) return this._i = this.data.length;
			else this._i = this._i + 2;
		} else {
			this._i = this.data.indexOf(">", this._i + 1);
			if (this._i == -1) return this._i = this.data.length;
		}
		this._sectionStart = this._i + 1;
		this._state = this.Text;
	};
	TagName(c) {
		if (isBlankChar(c)) {
			this._tagName = this.getSelection(true);
			if (this.checkClose()) this.setNode();
			else this._state = this.AttrName;
		} else if (this.checkClose()) {
			this._tagName = this.getSelection();
			this.setNode();
		}
	};
	AttrName(c) {
		if (isBlankChar(c)) {
			this._attrName = this.getSelection(true).toLowerCase();
			if (this.data[this._i] == '=') {
				while (isBlankChar(this.data[++this._i]));
				this._sectionStart = this._i;
				this._i--;
				this._state = this.AttrValue;
			} else this.setAttr();
		} else if (c == '=') {
			this._attrName = this.getSelection().toLowerCase();
			while (isBlankChar(this.data[++this._i]));
			this._sectionStart = this._i;
			this._i--;
			this._state = this.AttrValue;
		} else if (this.checkClose()) {
			this._attrName = this.getSelection().toLowerCase();
			this.setAttr();
		}
	};
	AttrValue(c) {
		if (c == '"' || c == "'") {
			this._sectionStart++;
			if ((this._i = this.data.indexOf(c, this._i + 1)) == -1) return this._i = this.data.length;
		} else
			for (; !isBlankChar(this.data[this._i] && this.data[this._i] != '/' && this.data[this._i] != '>'); this
				._i++);
		this._attrValue = this.getSelection();
		while (this._attrValue.includes("&quot;")) this._attrValue = this._attrValue.replace("&quot;", '');
		this.setAttr();
	};
	EndTag(c) {
		if (isBlankChar(c) || c == '>' || c == '/') {
			var name = this.getSelection().toLowerCase();
			var flag = false;
			for (var i = this._STACK.length - 1; i >= 0; i--)
				if (this._STACK[i].name == name) {
					flag = true;
					break;
				}
			if (flag) {
				var node;
				while (flag) {
					node = this._STACK.pop();
					if (node.name == name) flag = false;
					this.popNode(node);
				}
			} else if (name == 'p' || name == "br") {
				var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
				var node = {
					name
				}
				slibings.push(node);
			}
			this._i = this.data.indexOf('>', this._i);
			if (this._i == -1) this._i = this.data.length;
			else this._state = this.Text;
		}
	};
};
module.exports = {
	parseHtml: (data, options) => new Promise((resolve) => new MpHtmlParser(data, options, resolve).parse()),
	parseHtmlSync: (data, options) => new MpHtmlParser(data, options).parse()
};
