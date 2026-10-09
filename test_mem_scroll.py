from playwright.sync_api import sync_playwright

def test_memories_scroll():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport
        context = browser.new_context(viewport={'width': 390, 'height': 844})
        page = context.new_page()
        page.goto('http://localhost:3000')
        page.wait_for_timeout(1000)

        # Activate memories screen
        page.evaluate("""
        () => {
            document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
            const mem = document.getElementById('screen-memories');
            mem.classList.add('active');
        }
        """)
        page.wait_for_timeout(500)

        # Check scroll metrics before scroll
        info_before = page.evaluate("""
        () => {
            const mem = document.getElementById('screen-memories');
            return {
                scrollHeight: mem.scrollHeight,
                clientHeight: mem.clientHeight,
                scrollTop: mem.scrollTop
            };
        }
        """)
        print("Before scroll:", info_before)

        # Perform scroll on #screen-memories
        page.evaluate("""
        () => {
            const mem = document.getElementById('screen-memories');
            mem.scrollTop = 400;
        }
        """)
        page.wait_for_timeout(500)

        info_after = page.evaluate("""
        () => {
            const mem = document.getElementById('screen-memories');
            return {
                scrollHeight: mem.scrollHeight,
                clientHeight: mem.clientHeight,
                scrollTop: mem.scrollTop
            };
        }
        """)
        print("After scroll:", info_after)

        page.screenshot(path='screenshot_memories_scrolled.png')

        # Scroll all the way to the bottom to verify the video button is reachable
        page.evaluate("""
        () => {
            const mem = document.getElementById('screen-memories');
            mem.scrollTop = mem.scrollHeight;
        }
        """)
        page.wait_for_timeout(500)
        page.screenshot(path='screenshot_memories_bottom.png')
        print("Captured bottom screenshot")

        browser.close()

if __name__ == '__main__':
    test_memories_scroll()
