const keyword = window.keyword || '';

const requesturl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbGxBlSXApgZNxfA4UlXJt-3ZEk3eRWaTLdxnsF9UDMP3EKrqC5nD7-T0fromp29n2-qvMOr7T8NhK/pub';

async function fetchAndProcessCSV() {
    const response = await fetch(requesturl + '?output=csv');
    const csvText = await response.text();

    const rows = csvText.trim().split('\n').map(row => row.split(','));
    let filteredRows = rows.filter(row => row[0].includes(keyword));

    let allhtml = [];

    for (let i = 0; i < filteredRows.length; i++) {
        const row = filteredRows[i];
        const kanji = row[1] || '';
        const yomi = row[2] || '';
        const rowhtml = `
      <h3>${kanji}</h3>
      <p>${yomi}</p>
      <div class='search'>
        <ul>
          <li>検索: </li>
          <li><a title='Googleで${yomi}を検索' href='https://www.google.com/search?q=${yomi}'><img class='icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png'></a></li>
          <li><a title='Microsoft Bingで${yomi}を検索' href='https://www.bing.com/search?q=${yomi}'><img class='icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Bing_Fluent_Logo.svg/800px-Bing_Fluent_Logo.svg.png'></a></li>
          <li><a title='Yahoo!で${yomi}を検索' href='https://search.yahoo.co.jp/search?p=${yomi}'><img class='icon' src='https://upload.wikimedia.org/wikipedia/commons/e/e8/Y_exclamation_mark_%28Yahoo%21%29_%281996-2009%29.png'></a></li>
        </ul>
      </div>
    `;
        allhtml.push(rowhtml);
    }

    document.getElementById('container').innerHTML = allhtml.join('\n');
}

function setHeader() {
    document.getElementById('header').innerHTML = `<h2>${keyword}</h2>`;
}

function setFooter() {
    document.getElementById('footer').innerHTML = `
          <p>
            当サイトでは、Google アナリティクスを使用して、ユーザーのサイト利用状況を分析しています。これにより、サイトの改善に役立てるためのデータ収集を行っています。Google アナリティクスが収集する情報には、閲覧ページ、滞在時間、デバイス情報などが含まれますが、個人を特定する情報は含まれていません。
          </p>
          <p>
            詳細については、<a href="https://www.google.com/analytics/terms/jp.html" target="_blank">Google アナリティクスのプライバシーポリシー</a>をご確認ください。
          </p>
        `;
}
document.addEventListener("DOMContentLoaded", () => {
    setHeader();
    setFooter();
    fetchAndProcessCSV();
});
