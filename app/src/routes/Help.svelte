<script>
    import "../kbd.css";
</script>



<div class="instructions text-white h-full w-full z-10 absolute top-0 left-0 p-16 flex flex-col justify-between items-center">
    <div class="flex flex-col gap-2 relative">
        <div class="flex flex-row gap-2">
            <kbd class="kbc-button invisible w-12 h-12">a</kbd>
            <div class="transform -translate-x-1/2 relative">
                <kbd class="kbc-button w-12 h-12 w">
                    w
                    <div class="absolute -top-1 transform -translate-y-full whitespace-nowrap">
                        Clockwise
                    </div>
                </kbd>
            </div>
            <kbd class="kbc-button invisible w-12 h-12">d</kbd>
        </div>
        <div class="flex flex-row gap-2 w-full">
            <kbd class="kbc-button w-12 h-12 a">
                a
                <div class="absolute -left-3 transform -translate-x-full whitespace-nowrap">
                    Backward
                </div>
            </kbd>
            <kbd class="kbc-button w-12 h-12 s">
                s
                <div class="absolute -bottom-3 transform translate-y-full text-center">
                    <span class="whitespace-nowrap">Counter-Clockwise</span>
                </div>
            </kbd>
            <kbd class="kbc-button w-12 h-12 d">
                d
                <div class="absolute left-full transform translate-x-3 whitespace-nowrap">
                    Forward
                </div>
            </kbd>
        </div>
    </div>
    <div class="text-xl">
        <!-- Rotation is <i>cumulative</i> i.e. -->
        <i>Cumulative Rotation</i> 
        <ul type="1" class="list-inside ml-6">
            <li> First line rotates 10°</li>
            <li> Second line rotates 20°</li>
            <li> And so on... </li>
            <li> Last line rotates 360°</li>
        </ul>
    </div>
</div>


<style>
    kbd {
        margin: 4px;
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    }
    kbd div {
        font-size: 1.2rem;
    }
    kbd.d {
        color: darkcyan;
    }
    kbd.a {
        color: darkred;
    }
    kbd.s {
        color: darkgreen;
    }
    kbd.w {
        color: darkmagenta;
    }
    kbd.d div {
        color: cyan;
    }
    kbd.a div {
        color: red;
    }
    kbd.s div {
        color: lime;
    }
    kbd.w div {
        color: magenta;
    }
</style>