$path = 'C:\Users\david\.gemini\antigravity\scratch\valorant-esports-web\styles.css'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 1. DELETE dead CSS rules
$content = $content -replace '(?s)\.marquee-wrapper\s*\{[^}]+\}', ''
$content = $content -replace '(?s)\.marquee-content\s*\{[^}]+\}', ''
$content = $content -replace '(?s)\.marquee-content\s+span\s*\{[^}]+\}', ''
$content = $content -replace '(?s)@keyframes\s+marquee\s*\{[^}]+\}', ''
$content = $content -replace '(?s)\.role-watermark\s*\{[^}]+\}', ''
$content = $content -replace '(?s)\.player-card:hover\s+\.role-watermark\s*\{[^}]+\}', ''
$content = $content -replace '(?s)\.bg-red\s*\{[^}]+\}', ''
$content = $content -replace '(?s)\.bg-black\s*\{[^}]+\}', ''
$content = $content -replace '(?m)^\.match-card\.featured.*$', ''
$content = $content -replace '(?s)\.player-mains\s*\{[^}]+\}', ''

$content = $content.Replace("display: inline-block; width: 20px;", "width: 20px;")
$content = $content.Replace("/* Custom Cursor Removed */", "")

# 2. FIX fragile attribute selectors in media queries
$content = $content.Replace('div[style*="grid-template-columns: repeat(auto-fit, minmax(180px"]', '.stats-grid-responsive')
$content = $content.Replace('div[style*="max-width: 800px"]', '.match-card-wrapper')
$content = $content.Replace('div[style*="font-size: 3.5rem"]', '.match-title-responsive')
$content = $content.Replace('div[style*="grid-template-columns: repeat(3"]', '.philosophy-grid')
$content = $content.Replace('div[style*="padding: 2.5rem 4rem"]', '.match-card-padding')
$content = $content.Replace('div[style*="padding: 100px"]', '.section-padding-large')

# 3. FIX mobile menu overflow
$navLinksTarget = '.nav-links {
        display: none !important;'
$navLinksRepl = '.nav-links {
        max-height: calc(100vh - 70px);
        overflow-y: auto;
        display: none !important;'
$content = $content.Replace($navLinksTarget, $navLinksRepl)

# 4. ADD content-visibility optimization
$content += @"

.legacy-container, #news-container {
  content-visibility: auto;
  contain-intrinsic-size: 0 800px;
}
"@

# 5. ADD LFP placeholder card styles
$content += @"

.player-card.lfp-card {
  border: 2px dashed rgba(255, 70, 85, 0.4);
  background: rgba(15, 25, 35, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 350px;
  position: relative;
  animation: lfp-pulse 2s ease-in-out infinite;
}
.player-card.lfp-card .lfp-content {
  text-align: center;
  padding: 2rem;
}
.player-card.lfp-card .lfp-icon {
  font-size: 3rem;
  color: var(--val-red);
  margin-bottom: 1rem;
  opacity: 0.6;
}
.player-card.lfp-card .lfp-role {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--val-red);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 0.5rem;
}
.player-card.lfp-card .lfp-label {
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--val-grey);
  text-transform: uppercase;
  letter-spacing: 2px;
}
@keyframes lfp-pulse {
  0%, 100% { border-color: rgba(255, 70, 85, 0.2); }
  50% { border-color: rgba(255, 70, 85, 0.6); }
}
"@

# 6. ADD holographic spotlight effect on player cards
$content += @"

.player-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 60%);
  pointer-events: none;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.player-card:hover::before {
  opacity: 1;
}
"@

# 7. ADD chamfered CTA button variant
$content += @"

.cta-button-hud {
  clip-path: polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px);
  background: var(--val-red);
  color: white;
  font-family: var(--font-heading);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 1rem 2.5rem;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.cta-button-hud:hover {
  background: #ff1a2e;
}
"@

# 8. ADD film grain overlay
$content += @"

body::after {
  content: '';
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 99997;
  opacity: 0.4;
}
"@

# 9. IMPROVE easing curves globally
$easingVars = @"
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-in-out-smooth: cubic-bezier(0.65, 0, 0.35, 1);
"@
$content = $content.Replace(':root {', ":root {`n$easingVars")

# 10. ADD modal scroll lock
$content += @"

body.modal-open {
  overflow: hidden;
}
"@

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
