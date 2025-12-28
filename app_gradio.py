import gradio as gr
from sidekick import Sidekick

# -------------------------
# Initialization
# -------------------------

async def setup_sidekick():
    sk = Sidekick()
    await sk.setup()
    return sk


async def run_agent(sk, message, success_criteria, history):
    if sk is None:
        sk = await setup_sidekick()

    result = await sk.run_superstep(
        message=message,
        success_criteria=success_criteria,
        history=history
    )

    return result, sk


async def reset_agent():
    sk = Sidekick()
    await sk.setup()
    return "", "", [], sk


def cleanup(sk):
    try:
        if sk:
            sk.free_resources()
    except Exception as e:
        print("Cleanup error:", e)


# -------------------------
# UI
# -------------------------

with gr.Blocks(
    title="Sidekick",
    theme=gr.themes.Default(primary_hue="emerald")
) as ui:

    gr.Markdown("## 🧠 Sidekick Personal Co-Worker")

    sidekick_state = gr.State(delete_callback=cleanup)

    chatbot = gr.Chatbot(
        label="Sidekick",
        height=300
    )

    message = gr.Textbox(
        placeholder="Your request to the Sidekick",
        show_label=False
    )

    success_criteria = gr.Textbox(
        placeholder="What are your success criteria?",
        show_label=False
    )

    with gr.Row():
        reset_button = gr.Button("Reset", variant="stop")
        go_button = gr.Button("Go!", variant="primary")

    # -------------------------
    # Events
    # -------------------------

    ui.load(
        setup_sidekick,
        inputs=[],
        outputs=[sidekick_state]
    )

    go_button.click(
        run_agent,
        inputs=[sidekick_state, message, success_criteria, chatbot],
        outputs=[chatbot, sidekick_state]
    )

    message.submit(
        run_agent,
        inputs=[sidekick_state, message, success_criteria, chatbot],
        outputs=[chatbot, sidekick_state]
    )

    success_criteria.submit(
        run_agent,
        inputs=[sidekick_state, message, success_criteria, chatbot],
        outputs=[chatbot, sidekick_state]
    )

    reset_button.click(
        reset_agent,
        inputs=[],
        outputs=[message, success_criteria, chatbot, sidekick_state]
    )

# -------------------------
# Launch
# -------------------------

ui.launch(inbrowser=True)
