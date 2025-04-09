export function hideChatDropdown() {
  const dropdowns = [
    document.getElementById("chat-header_properties-dropdown") as HTMLElement,
    document.getElementById("chat-footer_properties-dropdown") as HTMLElement
  ]

  for (const dropdown of dropdowns) {
    if (dropdown) {
      if (dropdown.classList.contains("display-block")) {
        dropdown.classList.remove("display-block")
      }
    }
  }
}
