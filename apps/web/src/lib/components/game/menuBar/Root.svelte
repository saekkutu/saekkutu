<script lang="ts">
    import { Button } from ".";
    import '@fortawesome/fontawesome-free/css/all.min.css'
    import { dialogs } from "$lib/stores/dialogs";
</script>

<div>
    <!-- Tiny Buttons -->
    <Button tiny color="rgb(187, 187, 187)" title="도움말">
        <i class="fas fa-question-circle"></i>
    </Button>
    <Button tiny color="rgb(204, 204, 204)" title="설정">
        <i class="fas fa-wrench"></i>
    </Button>
    <Button tiny color="rgb(218, 169, 255)" title="친구 목록">
        <i class="fas fa-user-friends"></i>
    </Button>
    <Button tiny color="rgb(255, 155, 155)" title="차단 목록">
        <i class="fas fa-user-slash"></i>
    </Button>
    
    <!-- Normal Buttons -->
    <Button color="rgb(142, 192, 243)" onclick={() => {
        dialogs.update(state => ({ ...state, createRoom: !state.createRoom }));
        console.log($dialogs);
    }}>
        방 만들기
    </Button>
    <Button color="rgb(176, 210, 243)">
        빠른 입장
    </Button>
    <Button color="rgb(179, 231, 183)">
        상점
    </Button>
    <Button color="rgb(115, 208, 122)">
        사전
    </Button>
    <Button color="rgb(217, 255, 130)">
        리플레이
    </Button>
    <Button color="rgb(255, 173, 211)">
        <i class="fas fa-trophy"></i>
        랭킹
    </Button>
</div>

