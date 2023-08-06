<header>
	<h1>Polar Forms</h1>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/questions">Questions</a></li>
			<li><a href="/question-list">Question list</a></li>
			<li><a href="/chart">Chart</a></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: var(--xanthous);
		color: #fff;

		h1 {
			font-size: 2rem;
		}

		nav {
			ul {
				display: flex;
				flex-wrap: wrap;
				list-style: none;
				gap: 2rem 1rem;

				li {
					a {
						background: var(--quinacridone-magenta);
						text-align: center;
						border-radius: 0.25rem;
						color: #fff;
						text-decoration: none;
						font-size: 1.25rem;
						padding: 0.5rem 1rem;
						word-break: keep-all;

						&:hover {
							background: var(--raspberry);
						}
					}
				}
			}
		}
	}
</style>
