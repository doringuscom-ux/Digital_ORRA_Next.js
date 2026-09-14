<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Digital ORRA</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet" />
        <style type="text/css">
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background: #080D1F;
            color: #F8FAFC;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            padding: 40px 20px 80px 20px;
            min-height: 100vh;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          /* Header */
          .header {
            background: linear-gradient(135deg, rgba(20, 30, 60, 0.7) 0%, rgba(10, 17, 40, 0.8) 100%);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            padding: 32px 36px;
            margin-bottom: 28px;
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(16px);
            position: relative;
            overflow: hidden;
          }
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #06B6D4, #FF3399, #8B5CF6);
          }
          .brand-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 16px;
          }
          .brand-title {
            font-size: 26px;
            font-weight: 800;
            color: #FFFFFF;
            letter-spacing: -0.5px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brand-badge {
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 1.5px;
            padding: 4px 10px;
            border-radius: 999px;
            background: rgba(6, 182, 212, 0.15);
            color: #22D3EE;
            border: 1px solid rgba(6, 182, 212, 0.3);
          }
          .header p {
            color: #94A3B8;
            font-size: 14px;
            max-width: 800px;
            margin-bottom: 20px;
          }
          .stats-row {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            align-items: center;
          }
          .stat-chip {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 8px 16px;
            border-radius: 12px;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .stat-chip strong {
            color: #06B6D4;
            font-weight: 800;
            font-size: 15px;
          }

          /* Actions Toolbar */
          .toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }
          .search-box {
            flex: 1;
            min-width: 280px;
            position: relative;
          }
          .search-box input {
            width: 100%;
            background: rgba(14, 23, 48, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 14px;
            padding: 12px 18px 12px 42px;
            color: #FFFFFF;
            font-size: 14px;
            font-family: inherit;
            outline: none;
            transition: all 0.2s ease;
          }
          .search-box input:focus {
            border-color: #06B6D4;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.25);
            background: rgba(18, 30, 62, 0.95);
          }
          .search-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #94A3B8;
            font-size: 16px;
            pointer-events: none;
          }
          .toolbar-actions {
            display: flex;
            gap: 10px;
          }
          .btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #FFFFFF;
            padding: 11px 20px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            font-family: inherit;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s ease;
            text-decoration: none;
          }
          .btn:hover {
            background: rgba(6, 182, 212, 0.2);
            border-color: #06B6D4;
            color: #22D3EE;
            transform: translateY(-1px);
          }
          .btn-primary {
            background: linear-gradient(135deg, #06B6D4 0%, #0284C7 100%);
            border: 1px solid rgba(6, 182, 212, 0.5);
            color: #FFFFFF;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
          }
          .btn-primary:hover {
            background: linear-gradient(135deg, #22D3EE 0%, #0369A1 100%);
            color: #FFFFFF;
          }

          /* Table Styling */
          .table-wrapper {
            background: rgba(13, 21, 44, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(14px);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          thead {
            background: rgba(255, 255, 255, 0.03);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          th {
            padding: 14px 18px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #94A3B8;
            font-weight: 700;
          }
          td {
            padding: 14px 18px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            color: #E2E8F0;
            font-size: 13.5px;
            vertical-align: middle;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tbody tr {
            transition: background 0.15s ease;
          }
          tbody tr:hover {
            background: rgba(6, 182, 212, 0.06);
          }
          .index-col {
            color: #64748B;
            font-weight: 600;
            font-size: 12px;
            width: 50px;
          }
          .url-col {
            font-weight: 500;
            word-break: break-all;
          }
          .url-link {
            color: #38BDF8;
            text-decoration: none;
            transition: color 0.15s ease;
            display: inline-block;
          }
          .url-link:hover {
            color: #FF3399;
            text-decoration: underline;
          }
          
          /* Copy Button in Table */
          .copy-btn {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #E2E8F0;
            border-radius: 8px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
          }
          .copy-btn:hover {
            background: rgba(6, 182, 212, 0.2);
            border-color: #06B6D4;
            color: #22D3EE;
          }
          .copy-btn.copied {
            background: rgba(16, 185, 129, 0.2) !important;
            border-color: #10B981 !important;
            color: #34D399 !important;
          }

          /* Badges */
          .badge {
            display: inline-block;
            padding: 3px 9px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .badge-high {
            background: rgba(16, 185, 129, 0.15);
            color: #34D399;
            border: 1px solid rgba(16, 185, 129, 0.3);
          }
          .badge-med {
            background: rgba(6, 182, 212, 0.15);
            color: #22D3EE;
            border: 1px solid rgba(6, 182, 212, 0.3);
          }
          .badge-low {
            background: rgba(148, 163, 184, 0.15);
            color: #CBD5E1;
            border: 1px solid rgba(148, 163, 184, 0.25);
          }
          .badge-freq {
            background: rgba(139, 92, 246, 0.15);
            color: #C084FC;
            border: 1px solid rgba(139, 92, 246, 0.25);
          }

          /* Toast Alert */
          #toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #0F172A;
            color: #FFFFFF;
            border: 1px solid #06B6D4;
            padding: 12px 20px;
            border-radius: 12px;
            font-size: 13.5px;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(6, 182, 212, 0.3);
            display: flex;
            align-items: center;
            gap: 10px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            z-index: 9999;
          }
          #toast.show {
            opacity: 1;
            transform: translateY(0);
          }

          /* Footer Info */
          .footer-note {
            margin-top: 24px;
            text-align: center;
            color: #64748B;
            font-size: 12.5px;
          }
          .footer-note a {
            color: #06B6D4;
            text-decoration: none;
          }
          .footer-note a:hover {
            text-decoration: underline;
          }

          @media (max-width: 768px) {
            body {
              padding: 20px 12px 60px 12px;
            }
            .header {
              padding: 20px 16px;
            }
            .brand-title {
              font-size: 20px;
            }
            .hide-mobile {
              display: none;
            }
            th, td {
              padding: 10px 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="brand-row">
              <div class="brand-title">
                <span>Digital ORRA</span>
                <span class="brand-badge">XML Sitemap</span>
              </div>
              <a href="https://digitalorra.com" class="btn">
                <span>Visit Main Website</span>
                <span>→</span>
              </a>
            </div>
            <p>
              This is the official search engine XML sitemap for Digital ORRA. You can easily browse, search, and click "Copy Link" to copy any page URL to your clipboard.
            </p>
            <div class="stats-row">
              <div class="stat-chip">
                <span>Total Indexed URLs:</span>
                <strong id="totalCount"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
              </div>
              <div class="stat-chip">
                <span>Format:</span>
                <strong style="color: #FF3399;">Sitemaps.org 0.9</strong>
              </div>
              <div class="stat-chip">
                <span>Live Filter:</span>
                <strong style="color: #34D399;">Enabled</strong>
              </div>
            </div>
          </div>

          <!-- Actions Toolbar -->
          <div class="toolbar">
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input type="text" id="searchInput" placeholder="Search URLs (e.g. /services, /courses, /blog, location)..." onkeyup="filterUrls()" />
            </div>
            <div class="toolbar-actions">
              <button class="btn btn-primary" onclick="copyAllUrls()">
                <span>📋 Copy All URLs</span>
              </button>
            </div>
          </div>

          <!-- URLs Table -->
          <div class="table-wrapper">
            <table id="sitemapTable">
              <thead>
                <tr>
                  <th class="index-col">#</th>
                  <th>Page URL (Click to Open)</th>
                  <th style="width: 110px; text-align: center;">Action</th>
                  <th class="hide-mobile" style="width: 100px; text-align: center;">Priority</th>
                  <th class="hide-mobile" style="width: 120px; text-align: center;">Change Freq</th>
                  <th class="hide-mobile" style="width: 180px;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td class="index-col">
                      <xsl:value-of select="position()"/>
                    </td>
                    <td class="url-col">
                      <a class="url-link" target="_blank">
                        <xsl:attribute name="href">
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:attribute>
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td style="text-align: center;">
                      <button class="copy-btn" title="Copy URL">
                        <xsl:attribute name="onclick">
                          copyUrl(this, '<xsl:value-of select="sitemap:loc"/>')
                        </xsl:attribute>
                        <span>Copy</span>
                      </button>
                    </td>
                    <td class="hide-mobile" style="text-align: center;">
                      <xsl:variable name="p" select="sitemap:priority"/>
                      <xsl:choose>
                        <xsl:when test="$p &gt;= 0.9">
                          <span class="badge badge-high"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:when test="$p &gt;= 0.7">
                          <span class="badge badge-med"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge badge-low"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="hide-mobile" style="text-align: center;">
                      <span class="badge badge-freq">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td class="hide-mobile" style="color: #94A3B8; font-size: 12px; font-family: monospace;">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="footer-note">
            Generated dynamically by <a href="https://digitalorra.com">Digital ORRA</a>. Search engines automatically parse this XML file for indexing.
          </div>
        </div>

        <!-- Toast Notification -->
        <div id="toast">
          <span>✓</span>
          <span id="toastMsg">Link copied to clipboard!</span>
        </div>

        <!-- Interactive JavaScript for 1-Click Copy & Real-Time Filtering -->
        <script type="text/javascript">
          <![CDATA[
          function showToast(text) {
            var toast = document.getElementById('toast');
            var msg = document.getElementById('toastMsg');
            msg.textContent = text;
            toast.classList.add('show');
            setTimeout(function() {
              toast.classList.remove('show');
            }, 2500);
          }

          function copyUrl(btn, url) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(url).then(function() {
                var originalText = btn.innerHTML;
                btn.innerHTML = '✓ Copied';
                btn.classList.add('copied');
                showToast('Copied: ' + url);
                setTimeout(function() {
                  btn.innerHTML = originalText;
                  btn.classList.remove('copied');
                }, 2000);
              }).catch(function() {
                fallbackCopy(btn, url);
              });
            } else {
              fallbackCopy(btn, url);
            }
          }

          function fallbackCopy(btn, url) {
            var temp = document.createElement('textarea');
            temp.value = url;
            temp.style.position = 'fixed';
            temp.style.left = '-9999px';
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);

            var originalText = btn.innerHTML;
            btn.innerHTML = '✓ Copied';
            btn.classList.add('copied');
            showToast('Copied: ' + url);
            setTimeout(function() {
              btn.innerHTML = originalText;
              btn.classList.remove('copied');
            }, 2000);
          }

          function copyAllUrls() {
            var links = document.querySelectorAll('#sitemapTable tbody tr');
            var urls = [];
            for (var i = 0; i < links.length; i++) {
              if (links[i].style.display !== 'none') {
                var a = links[i].querySelector('.url-link');
                if (a) urls.push(a.textContent.trim());
              }
            }
            if (urls.length === 0) {
              showToast('No matching URLs to copy');
              return;
            }
            var text = urls.join('\n');
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text).then(function() {
                showToast('All ' + urls.length + ' URLs copied to clipboard!');
              });
            } else {
              var temp = document.createElement('textarea');
              temp.value = text;
              temp.style.position = 'fixed';
              temp.style.left = '-9999px';
              document.body.appendChild(temp);
              temp.select();
              document.execCommand('copy');
              document.body.removeChild(temp);
              showToast('All ' + urls.length + ' URLs copied to clipboard!');
            }
          }

          function filterUrls() {
            var input = document.getElementById('searchInput');
            var filter = input.value.toLowerCase().trim();
            var rows = document.querySelectorAll('#sitemapTable tbody tr');
            var visibleCount = 0;

            for (var i = 0; i < rows.length; i++) {
              var urlLink = rows[i].querySelector('.url-link');
              if (urlLink) {
                var urlText = urlLink.textContent.toLowerCase();
                if (urlText.indexOf(filter) > -1) {
                  rows[i].style.display = '';
                  visibleCount++;
                } else {
                  rows[i].style.display = 'none';
                }
              }
            }
            document.getElementById('totalCount').textContent = visibleCount;
          }
          ]]>
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
