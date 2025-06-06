<script>
    let { head, body, time } = $props();
</script>

<style>
    .chat-item {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .chat-item-content {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }

    .chat-head {
        width: 100px;

        text-align: center;
        font-weight: bold;

        overflow: hidden;
        text-overflow: ellipsis;
    }

    .chat-head:hover {
        background-color: #FFF;
    }

    .chat-item-time {
        font-size: 11px;
        color: #999999;
    }
</style>

<div class="chat-item">
    <div class="chat-item-content">
        <div class="chat-head">
            {head}
        </div>
    
        <div class="chat-body">
            {body}
        </div>
    </div>

    <div class="chat-item-time">
        {time}
    </div>
</div>