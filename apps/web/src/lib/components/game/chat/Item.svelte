<script>
    let { head, body, time } = $props();
</script>

<style>
    .chat-item {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;

        padding: 1px 0px;
        margin: 1px 0px;
    }

    .chat-item-content {
        display: flex;
        flex-direction: row;
        gap: 9px;

        flex: 1;
    }

    .chat-head {
        width: 100px;
        flex-shrink: 0;

        text-align: center;
        font-weight: bold;

        overflow: hidden;
        text-overflow: ellipsis;

        cursor: pointer;
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