defmodule Weather.Router do
  alias Weather.Coordinates
  use Plug.Router
  use Plug.Debugger
  require Logger
  plug(Plug.Logger, log: :debug)
  plug(:match)
  plug(:dispatch)
  # routes
  get "/hello" do
    send_resp(conn, 200, "World")
  end

  post "/post" do
    {:ok, body, conn} = read_body(conn)

    result =
      Poison.decode!(body, as: %Coordinates{})
      |> Weather.Darksky.get_weather()

    conn
    |> put_resp_header("content-type", "application/json")
    |> send_resp(result.status_code, result.body)
  end

  match _ do
    send_resp(conn, 404, "not found")
  end
end
