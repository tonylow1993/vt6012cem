var rgpCopyRightE = {
	'home' : 'The Hong Kong Jockey Club. All rights reserved.',
	'racing': 'HKJC Horse Race Betting Limited. All rights reserved.',
	'football': 'HKJC Football Betting Limited. All rights reserved.',
	'marksix': 'HKJC Lotteries Limited. All rights reserved.'
};

var rgpCopyRightC = {
	'home' : '香港賽馬會',
	'racing': '香港馬會賽馬博彩有限公司',
	'football': '香港馬會足球博彩有限公司',
	'marksix': '香港馬會獎券有限公司'
};

var rgpUrlListE = {
	'contactUs' : { 'name' : 'Contact Us', 'url' : '//www.hkjc.com/infomenu/en/contact/feedback.aspx'},
	'siteMap' : { 'name' : 'Site Map', 'url' : '//www.hkjc.com/home/english/sitemap.aspx'},
	'rules' : { 'name' : 'Rules', 'url' : '//www.hkjc.com/english/betting/betting_rule_en.htm'},
	'rgp' : { 'name' : 'Responsible Gambling Policy', 'url' : '//www.hkjc.com/responsible-gambling/en/index.aspx'},
	'privacy' : { 'name' : 'Privacy', 'url' : '//www.hkjc.com/home/english/corporate/corp_privacy.aspx'},
	'disclaimer' : { 'name' : 'Disclaimer', 'url' : '//special.hkjc.com/root/info/en/disclaimer.asp'},
	'securityTips' : { 'name' : 'Security Tips', 'url' : '//www.hkjc.com/home/english/corporate/security-tips.aspx'},
	'copyright' : { 'name' : 'Copyright', 'url' : '//www.hkjc.com/english/copyright.htm'}
};

var rgpUrlListC = {
	'contactUs' : { 'name' : '聯絡我們', 'url' : '//www.hkjc.com/infomenu/ch/contact/feedback.aspx'},
	'siteMap' : { 'name' : '網頁指南', 'url' : '//www.hkjc.com/home/chinese/sitemap.aspx'},
	'rules' : { 'name' : '規例', 'url' : '//www.hkjc.com/chinese/betting/betting_rule_ch.htm'},
	'rgp' : { 'name' : '提倡有節制博彩', 'url' : '//www.hkjc.com/responsible-gambling/ch/index.aspx'},
	'privacy' : { 'name' : '私隱條款', 'url' : '//www.hkjc.com/home/chinese/corporate/corp_privacy.aspx'},
	'disclaimer' : { 'name' : '免責聲明', 'url' : '//special.hkjc.com/root/info/ch/disclaimer.asp'},
	'securityTips' : { 'name' : '網絡保安', 'url' : '//www.hkjc.com/home/chinese/corporate/security-tips.aspx'},
	'copyright' : { 'name' : '版權所有 不得轉載', 'url' : '//www.hkjc.com/chinese/copyright.htm'}
};

function getRGPImage(host) {
	var buf = new StringBuffer();
	var rgpUrlList = curLang=='en' ? rgpUrlListE : rgpUrlListC;
	var rgpImg = curLang=='en' ? 'rgp_text_710_eng.gif' : 'rgp_text_710_chi.gif';
	buf.append('<img src="').append(host!=null? host: '').append('/info/include/rgp/').append(rgpImg).append('" usemap="#Map" border ="0" width="710" height="103" />');
	buf.append('<map id ="Map" name ="Map">');
	buf.append('<area shape ="rect" coords ="640,2,708,43" href="').append(rgpUrlList['rgp'].url).append('" target="_blank" />');
	buf.append('</map>');
	return buf.toString();
}

function getRGPLinks() {
	var rgpUrlList = curLang=='en' ? rgpUrlListE : rgpUrlListC;
	var buf = new StringBuffer();
	buf.append('<a href="').append(rgpUrlList['contactUs'].url).append('" target="_blank" class="footer">').append(rgpUrlList['contactUs'].name).append('</a> | ');
	buf.append('<a href="').append(rgpUrlList['siteMap'].url).append('" target="_blank" class="footer">').append(rgpUrlList['siteMap'].name).append('</a> | ');
	buf.append('<a href="').append(rgpUrlList['rules'].url).append('" target="_blank" class="footer">').append(rgpUrlList['rules'].name).append('</a> | ');
	buf.append('<a href="').append(rgpUrlList['rgp'].url).append('" target="_blank" class="footer">').append(rgpUrlList['rgp'].name).append('</a> | ');
	buf.append('<a href="').append(rgpUrlList['privacy'].url).append('" target="_blank" class="footer">').append(rgpUrlList['privacy'].name).append('</a> | ');
	buf.append('<a href="').append(rgpUrlList['disclaimer'].url).append('" target="_blank" class="footer">').append(rgpUrlList['disclaimer'].name).append('</a> | ');
	buf.append('<a href="').append(rgpUrlList['securityTips'].url).append('" target="_blank" class="footer">').append(rgpUrlList['securityTips'].name).append('</a>');
	return buf.toString();
}
					
function getRGPCopyright() {
	var rgpUrlList = curLang=='en' ? rgpUrlListE : rgpUrlListC;
	var rgpCopyRight = curLang=='en' ? rgpCopyRightE : rgpCopyRightC;
	var buf = new StringBuffer();
	buf.append('<a href="').append(rgpUrlList['copyright'].url).append('" target="_blank" class="footer">').append(rgpUrlList['copyright'].name);
	buf.append('</a><span class="footer"> &copy; 2006-');
	buf.append((new Date()).getFullYear()).append(' ').append(rgpCopyRight[curProduct]);
	buf.append('</span>');
	return buf.toString();
}

function reloadRGPDiv(host) {
	$('#rgpImage').html(getRGPImage(host));
	$('#rgpLinks').html(getRGPLinks());
	$('#rgpCopyRight').html(getRGPCopyright());
}