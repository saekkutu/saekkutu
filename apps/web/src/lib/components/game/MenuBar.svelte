<script>
    import MenuBarButton from "./MenuBarButton.svelte";
    import '@fortawesome/fontawesome-free/css/all.min.css'
</script>

<style>
    .menu-bar {
        width: 100%;
        height: 30px;
    }
</style>

<div class="menu-bar">
    <!-- Tiny Buttons -->
    <MenuBarButton tiny color="rgb(187, 187, 187)" title="도움말">
        <i class="fas fa-question-circle"></i>
    </MenuBarButton>
    <MenuBarButton tiny color="rgb(204, 204, 204)" title="설정">
        <i class="fas fa-wrench"></i>
    </MenuBarButton>
    <MenuBarButton tiny color="rgb(218, 169, 255)" title="친구 목록">
        <i class="fas fa-user-friends"></i>
    </MenuBarButton>
    <MenuBarButton tiny color="rgb(255, 155, 155)" title="차단 목록">
        <i class="fas fa-user-slash"></i>
    </MenuBarButton>
    
    <!-- Normal Buttons -->
    <MenuBarButton color="rgb(142, 192, 243)">
        방 만들기
    </MenuBarButton>
    <MenuBarButton color="rgb(176, 210, 243)">
        빠른 입장
    </MenuBarButton>
    <MenuBarButton color="rgb(179, 231, 183)">
        상점
    </MenuBarButton>
    <MenuBarButton color="rgb(115, 208, 122)">
        사전
    </MenuBarButton>
    <MenuBarButton color="rgb(217, 255, 130)">
        리플레이
    </MenuBarButton>
    <MenuBarButton color="rgb(255, 173, 211)">
        <i class="fas fa-trophy"></i>
        랭킹
    </MenuBarButton>
</div>

