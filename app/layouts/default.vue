<template>
    <nav style="background: #fff; padding: 24px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.07);">
        <ul style="display: flex; flex-direction: column; align-items: stretch; width: 200px; margin: 0 auto; padding: 0; list-style: none; gap: 16px;">
            <li>
                <button
                    style="background: #c60b1e; height: 48px; width: 100%; border: none; border-radius: 8px; color: white; font-size: 1.2rem; font-weight: 600; cursor: pointer; transition: background 0.2s;"
                    @click="$router.push('/')"
                    @mouseover="event.target.style.background='#a00816'"
                    @mouseout="event.target.style.background='#c60b1e'"
                >
                    Index
                </button>
            </li>
            <li>
                <button
                    style="background: #ffc400; height: 48px; width: 100%; border: none; border-radius: 8px; color: #222; font-size: 1.2rem; font-weight: 600; cursor: pointer; transition: background 0.2s;"
                    @click="$router.push('/about')"
                    @mouseover="event.target.style.background='#e6b800'"
                    @mouseout="event.target.style.background='#ffc400'"
                >
                    About
                </button>
            </li>
            <li>
                <button
                    style="background: #c60b1e; height: 48px; width: 100%; border: none; border-radius: 8px; color: white; font-size: 1.2rem; font-weight: 600; cursor: pointer; transition: background 0.2s;"
                    @click="$router.push('/contacts')"
                    @mouseover="event.target.style.background='#a00816'"
                    @mouseout="event.target.style.background='#c60b1e'"
                >
                    Contacts
                </button>
            </li>
        </ul>
    </nav>
    <slot/>
</template>
